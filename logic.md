Stuck Point Detection + Real-Time Assistance
1. What we are building
Claarvia is a real-time session intelligence system that detects where a visitor gets stuck, why they are stuck, and what help should be shown next.
The system must:
track user behavior in real time
identify the current page goal
detect progress stalls
classify the likely friction type
assign confidence
choose the smallest useful intervention
measure whether the intervention helped
Core rule
Do not make decisions from a single event.
Decisions must be based on multiple signals, session context, and progression history.

2. System architecture
Required modules
Tracking SDK
Event Ingestion API
Session State Engine
Feature Engineering Engine
Intent and Friction Engine
Decision Engine
Action Renderer
Learning and Attribution Engine
Dashboard and Metrics Layer
Data flow
SDK → API → Event Processing → Session State → Feature Store → Decision Engine → UI Intervention → Response Logging → Learning
This follows the PDF’s real-time loop and module structure: tracking SDK, data pipeline, feature engineering, AI prediction, hesitation detection, decision engine, action system, dashboard, and learning engine.

3. API endpoints
3.1 Event ingestion
POST /v1/track
Receives normalized client events.
Request
{
  "event_id": "evt_123",
  "session_id": "sess_123",
  "visitor_id": "anon_hash",
  "event_type": "page_view",
  "timestamp": 1721900000,
  "page_type": "product",
  "page_goal": "evaluate_product",
  "step_name": "price_section",
  "device_type": "mobile",
  "metadata": {
    "scroll_depth": 65
  }
}

Response
{
  "status": "accepted"
}

3.2 Session state
GET /v1/session/{session_id}
Returns the live session state.
3.3 Stuck point detection
GET /v1/stuck-point/{session_id}
Returns the current detected stuck point, if any.
3.4 Decision endpoint
GET /v1/decision/{session_id}
Returns the recommended intervention.
Response
{
  "action": "trust_reassurance",
  "confidence": 0.87,
  "reason": "trust_concern",
  "status": "show"
}

3.5 Intervention response
POST /v1/intervention/{session_id}/response
Logs how the user responded to the assistance.
Request
{
  "intervention_id": "int_456",
  "response": "dismissed"
}

Response
{
  "status": "recorded"
}

3.6 Metrics
GET /v1/dashboard/metrics
Returns:
total visitors
sessions with stuck points
active interventions
intervention acceptance rate
recovery rate
assisted conversions
exit-risk recoveries
top friction types
top interventions
confidence distribution
decision latency

4. Database tables
4.1 sessions
Stores one record per session.
Column
Type
Purpose
session_id
PK
Session identifier
visitor_id
text
Anonymous visitor identifier
started_at
timestamp
Session start time
last_activity_at
timestamp
Last event time
country
text
Country inferred from IP metadata
device_type
text
mobile / desktop / tablet
current_page
text
Current page path
current_page_goal
text
Goal for the page
journey_state
text
explore / evaluate / compare / blocked / etc.
dominant_intent
text
Primary inferred intent
friction_type
text
Current blocker
confidence
numeric
Confidence score
intervention_count
int
Number of interventions shown

4.2 raw_events
Stores normalized event data.
Column
Type
Purpose
event_id
PK
Unique event id
session_id
FK
Related session
event_type
text
Event name
payload
jsonb
Full event payload
created_at
timestamp
Event time

The PDF explicitly uses sessions, raw_events, feature_store, and decision_logs as the core schema pattern.
4.3 feature_store
Stores derived real-time features.
Column
Type
Purpose
session_id
PK
Session identifier
intent_score
numeric
Probability of forward progress
friction_score
numeric
Probability of blockage
confidence_score
numeric
Confidence in the diagnosis
page_goal
text
Current page goal
friction_type
text
Dominant cause
stuck_step
text
Exact step where user is blocked
last_updated_at
timestamp
Feature update time

4.4 stuck_points
Stores detected blockage moments.
Column
Type
Purpose
stuck_point_id
PK
Unique stuck-point id
session_id
FK
Session reference
page_type
text
Page where blockage occurred
page_goal
text
Goal on that page
stuck_step
text
Exact blocked step
friction_type
text
Reason for blockage
evidence_count
int
Number of supporting signals
confidence
numeric
Confidence score
status
text
blocked / recovered / unresolved
detected_at
timestamp
Detection time
resolved_at
timestamp
Recovery time, if any

4.5 interventions
Stores every help action shown.
Column
Type
Purpose
intervention_id
PK
Unique intervention id
stuck_point_id
FK
Related stuck point
session_id
FK
Related session
intervention_type
text
help type
reason
text
Why it was shown
confidence
numeric
Confidence at trigger time
shown_at
timestamp
Time shown
dismissed_at
timestamp
If dismissed
clicked_at
timestamp
If clicked
outcome
text
helped / ignored / dismissed / converted / abandoned

4.6 attribution_log
Stores recovery and conversion attribution.
Column
Type
Purpose
attribution_id
PK
Unique attribution id
intervention_id
FK
Related intervention
before_state
text
Session state before help
after_state
text
Session state after help
recovery_status
text
recovered / unresolved
conversion_status
text
organic / assisted / none
confidence
numeric
Attribution confidence

4.7 decision_log
Stores decision history for auditing and learning.
Column
Type
Purpose
log_id
PK
Unique decision log id
session_id
FK
Related session
action_taken
text
Action shown or none
action_displayed
text
UI treatment used
user_response
text
User response
reward_score
numeric
Learning signal
created_at
timestamp
Log time

The PDF’s fallback, experimentation, and learning sections all rely on decision logging and outcome tracking.

5. Event schema
5.1 Standard event shape
Every client event must use the same shape.
{
  "event_id": "evt_123",
  "session_id": "sess_123",
  "visitor_id": "anon_hash",
  "event_type": "page_view",
  "timestamp": 1721900000,
  "page_type": "product",
  "page_goal": "evaluate_product",
  "step_name": "price_section",
  "element_type": "button",
  "element_label": "Add to Cart",
  "device_type": "mobile",
  "referrer": "google",
  "metadata": {
    "scroll_depth": 65,
    "hover_duration_ms": 2400,
    "idle_time_ms": 1200,
    "error_code": null
  }
}

5.2 Required event fields
event_id
session_id
visitor_id
event_type
timestamp
page_type
page_goal
step_name
device_type
metadata
5.3 Event categories
Navigation
page_view
route_change
back_navigation
search_query
filter_applied
sort_changed
tab_switch
Engagement
scroll_depth_reached
time_on_section
image_zoom
video_play
accordion_opened
spec_section_viewed
review_section_opened
variant_selected
Commitment
add_to_cart
wishlist_add
checkout_start
signup_start
email_capture
payment_method_selected
form_step_complete
Friction
validation_error
repeated_validation_error
dead_click
rage_click
long_idle_on_key_step
coupon_failed
search_no_results
back_and_forth_loop
checkout_field_abandon
payment_failed
form_reopen_after_error
Assistance response
intervention_seen
intervention_ignored
help_opened
help_dismissed
suggestion_clicked
comparison_opened
trust_module_opened
form_hint_used
chat_started
chat_answered
The PDF’s behavior framework also maps events like hover, scroll, idle, review interactions, price hovering, checkout hesitation, and repeated failure into confidence-based behavior detection.

6. Decision rules
6.1 Core rule
Do not trigger help from a single event.
6.2 Detection rule
A stuck point is valid only when:
the page goal is known
progress has stalled
there is repeated evidence of the same friction
the confidence threshold is high enough
6.3 Confidence thresholds
0.00–0.39 → observe
0.40–0.59 → collect more evidence
0.60–0.74 → prepare passive help
0.75–0.84 → show contextual help
0.85–1.00 → show active intervention
6.4 Intervention order
Do nothing
Inline hint
Contextual suggestion
FAQ recommendation
Assistant panel
Trust reassurance
Offer or incentive
6.5 Suppression rules
Do not show an intervention when:
the user is already moving forward
the same intervention was shown recently
confidence is too low
the current help type does not match the friction
the session is already over the action limit
6.6 Fallback rules
If the model is slow or unavailable:
use a deterministic rule-based fallback
prefer no action over wrong action
continue tracking and logging
The PDF already defines a fallback threshold, a no-action preference, and a confidence floor around 0.55.

7. Friction-to-action mapping
Friction type
Best help action
Price concern
price explanation, comparison view, savings framing
Trust concern
reviews, guarantee, return policy, security reassurance
Size confusion
size assistant, fit recommendation, size guide
Delivery concern
shipping timeline, delivery clarity
Payment fear
payment reassurance, retry help
Technical issue
error recovery, fallback path
Navigation confusion
step guidance, progress indicator
Comparison overload
side-by-side comparison
Feature confusion
product explanation, use-case summary


8. Privacy, consent, and retention
Required controls
consent check before non-essential tracking
anonymous visitor identifiers
no raw PII in event logs
encrypted transport and storage
deletion support
audit trail for decision actions
Consent behavior
If consent is absent:
track only page views
do not track click, hover, or deeper behavioral signals
Retention
raw events: delete after 30 days
derived state: keep as needed for operations
aggregate analytics: keep only if anonymized
The PDF calls for cookie consent, anonymization, 30-day retention, no IP storage, rate limiting, and encrypted transport/storage.

9. Learning and attribution
Outcome labels
helped
ignored
dismissed
converted
abandoned
error_resolved
unresolved
Learning signals
intervention acceptance rate
recovery rate
conversion after help
dismissal rate
false-positive intervention rate
time-to-resolution
Attribution logic
A conversion is considered assisted only if:
the session was blocked before intervention
the intervention was shown at the right stuck point
forward progress improved after intervention
conversion followed the recovery path
The PDF’s learning loop, AI-assisted conversion concept, and recovery tracking all depend on this exact before/after comparison.

10. Operational thresholds
Performance targets
SDK load time: < 100ms
decision latency: < 150ms P95
model accuracy: > 80%
system uptime: > 99.9%
Monitoring alerts
SDK latency high
AI model down
decision timeout
bounce rate increase
Redis memory pressure
These thresholds and alerts are directly aligned with the PDF’s KPI, monitoring, and DevOps sections.

11. Recommended implementation order
Phase 1
SDK event capture
/v1/track
sessions table
raw_events table
session state engine
basic stuck-point rules
fallback decision logic
Phase 2
feature store
friction classification
confidence scoring
intervention renderer
decision log
response logging
Phase 3
attribution engine
holdout framework
dashboard metrics
behavior library expansion
per-segment optimization
The PDF’s MVP and roadmap sections follow a similar progression: SDK tracking, backend API, feature engineering, basic model, decision engine, UI interventions, dashboard, testing, then growth and scale.

12. Definition of done
The system is ready when a developer can answer these questions from the logs alone:
What was the user trying to do?
Which exact step got stuck?
Which friction type was inferred?
How confident was the system?
What help was shown?
Did the user recover?
Did the user convert?
Was the conversion assisted or organic?
If the answer to any of those is missing, the tracking layer is incomplete.










