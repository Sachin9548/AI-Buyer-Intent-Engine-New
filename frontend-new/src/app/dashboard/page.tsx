// frontend/src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  store_url: string;
  whatsapp_number: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Backend API URL (Localhost ya Production)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const token = localStorage.getItem('claarvia_token');

    // Agar token nahi hai toh login par bhej do
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch Logged-in Merchant Profile
    fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('claarvia_token');
        router.push('/login');
      });
  }, [router, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem('claarvia_token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Claarvia BIME</h1>
            <p className="text-sm text-slate-500">Merchant Control Panel</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Account Verified & Active
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome aboard, {user?.name}! 🎉
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Thank you for choosing <span className="font-semibold text-indigo-600">Claarvia BIME</span>. Your merchant account has been created and verified successfully. Our integration team is reviewing your store setup and will connect with you shortly on your registered WhatsApp number.
          </p>

          <hr className="border-slate-100 mb-6" />

          {/* Account Details Review */}
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Your Registered Store Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Full Name</span>
              <span className="text-sm font-semibold text-slate-800">{user?.name}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Email Address</span>
              <span className="text-sm font-semibold text-slate-800">{user?.email}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Store URL</span>
              <a
                href={user?.store_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-indigo-600 hover:underline truncate block"
              >
                {user?.store_url}
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">WhatsApp Number</span>
              <span className="text-sm font-semibold text-slate-800">{user?.whatsapp_number}</span>
            </div>
          </div>
        </div>

        {/* Support Note */}
        <p className="text-center text-xs text-slate-400">
          Need immediate assistance? Reach out to us at{' '}
          <span className="text-slate-600 font-medium">support.claarvia@gmail.com</span>
        </p>
      </div>
    </div>
  );
}



// next dashbaord 
// frontend/src/app/dashboard/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface UserProfile {
//   name: string;
//   email: string;
//   store_url: string;
//   whatsapp_number: string;
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('claarvia_token');

//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     // Fetch verified profile from backend
//     fetch('https://api.claarvia.com/api/auth/me', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error('Unauthorized');
//         return res.json();
//       })
//       .then((data) => {
//         setUser(data.user);
//         setLoading(false);
//       })
//       .catch(() => {
//         localStorage.removeItem('claarvia_token');
//         router.push('/login');
//       });
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('claarvia_token');
//     router.push('/login');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-2xl mx-auto">
        
//         {/* Top Bar / Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center gap-2">
//             <span className="text-2xl font-black tracking-tight text-slate-900">
//               Claarvia<span className="text-indigo-600">.</span>
//             </span>
//             <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
//               Merchant Console
//             </span>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="text-sm font-medium text-slate-500 hover:text-red-600 transition"
//           >
//             Log out
//           </button>
//         </div>

//         {/* Welcome Status Card */}
//         <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-6">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
//               ✓
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-slate-900">
//                 Account Successfully Created!
//               </h1>
//               <p className="text-sm text-slate-500">
//                 Welcome to the Claarvia Autonomous Revenue Engine.
//               </p>
//             </div>
//           </div>

//           <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 my-6 text-sm text-indigo-900 leading-relaxed">
//             <p className="font-semibold mb-1">🎉 Thank you for choosing Claarvia!</p>
//             Your merchant account is verified and active. Our onboarding team is reviewing your store configuration and will connect with you on WhatsApp shortly to help you launch your first live revenue recovery nudges.
//           </div>

//           {/* Account Details Verification Table */}
//           <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
//             Your Account Details
//           </h2>

//           <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden text-sm">
//             <div className="flex justify-between py-3 px-4 bg-slate-50/50">
//               <span className="text-slate-500">Full Name</span>
//               <span className="font-medium text-slate-900">{user?.name}</span>
//             </div>
//             <div className="flex justify-between py-3 px-4">
//               <span className="text-slate-500">Email Address</span>
//               <span className="font-medium text-slate-900">{user?.email}</span>
//             </div>
//             <div className="flex justify-between py-3 px-4 bg-slate-50/50">
//               <span className="text-slate-500">Store Website</span>
//               <a
//                 href={user?.store_url}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="font-medium text-indigo-600 hover:underline"
//               >
//                 {user?.store_url}
//               </a>
//             </div>
//             <div className="flex justify-between py-3 px-4">
//               <span className="text-slate-500">WhatsApp Number</span>
//               <span className="font-medium text-slate-900">{user?.whatsapp_number}</span>
//             </div>
//             <div className="flex justify-between py-3 px-4 bg-slate-50/50">
//               <span className="text-slate-500">Account Status</span>
//               <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
//                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//                 Verified & Ready
//               </span>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }