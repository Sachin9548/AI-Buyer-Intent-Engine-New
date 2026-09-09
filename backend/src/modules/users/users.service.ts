import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { docClient } from '../../config/aws.config';
import { PutCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
export interface UserRecord {
  email: string;
  user_id: string;
  name: string;
  store_url: string;
  password_hash: string;
  whatsapp_number: string;
  is_verified: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class UsersService {
  private readonly tableName = 'BIME_Users';

  // 1. Find User By Email (Primary Key Lookup - Sub-millisecond)
  async findByEmail(email: string): Promise<UserRecord | null> {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: { email: email.toLowerCase().trim() },
      });

      const result = await docClient.send(command);
      return (result.Item as UserRecord) || null;
    } catch (error) {
      console.error('Error fetching user from DynamoDB:', error);
      throw new InternalServerErrorException('Database read error');
    }
  }

  // 2. Create New User (Initial state: is_verified = false)
async createUser(userData: {
    email: string;
    name: string;
    store_url: string;
    password_hash: string;
    whatsapp_number: string;
    role?: string;
    user_id?: string;
  }): Promise<UserRecord> {
   const now = new Date().toISOString();
    const newUser: UserRecord = {
      email: userData.email.toLowerCase().trim(),
      user_id: userData.user_id || `usr_${uuidv4().replace(/-/g, '')}`, // <-- Self-generate if not passed
      name: userData.name,
      store_url: userData.store_url,
      password_hash: userData.password_hash,
      whatsapp_number: userData.whatsapp_number,
      is_verified: false,
      role: userData.role || 'merchant',
      created_at: now,
      updated_at: now,
    };

    try {
      const command = new PutCommand({
        TableName: this.tableName,
        Item: newUser,
      });

      await docClient.send(command);
      return newUser;
    } catch (error) {
      console.error('Error creating user in DynamoDB:', error);
      throw new InternalServerErrorException('Database write error');
    }
  }

  // 3. Mark User As Verified after OTP validation
  async markAsVerified(email: string): Promise<boolean> {
    const now = new Date().toISOString();

    try {
      const command = new UpdateCommand({
        TableName: this.tableName,
        Key: { email: email.toLowerCase().trim() },
        UpdateExpression: 'set is_verified = :verified, updated_at = :now',
        ExpressionAttributeValues: {
          ':verified': true,
          ':now': now,
        },
      });

      await docClient.send(command);
      return true;
    } catch (error) {
      console.error('Error updating user verification in DynamoDB:', error);
      throw new InternalServerErrorException('Database update error');
    }
  }
}