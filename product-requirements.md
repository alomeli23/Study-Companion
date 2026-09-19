# Study-Companion

## Goal
Cloud-accessible study tracker where users track
real-world study time and grow a virtual companion
as a direct result of their studying.

## Core Loop
Study
-> Track time
-> Earn XP
-> Companion progresses
-> Check companion
-> Receive encouragement
-> Continue studying

## MVP
Users can:
- Have progress that persists between visits on the same browser
- Start and stop a study timer
- Have completed study sessions saved
- Earn XP based on study duration
- View their total XP and progress toward the next growth stage
- Hatch their egg after reaching the required XP
- See their companion's current growth stage
- Tap their companion to receive a stage-appropriate message
- View their previous study sessions

## Progression
- 1 minute of study = 1 XP
- XP is awarded when a study session ends
- XP is based on the session duration
- Egg hatches at 60 XP
- Growing stage begins at 300 XP
- Mature stage begins at 1,500 XP
- The companion has 3 growth stages after the egg: Newborn, Growing, and Mature
- XP continues accumulating after reaching the Mature stage
- The Mature stage has no maximum XP


## Study Sessions
- Users can start and stop a study timer
- XP is awarded when a session ends
- XP is based on the session duration
- Session duration is recorded in seconds
- Refreshing the page does not stop an active session
- Closing the browser or tab ends and saves the active session
- Starting the timer while a session is already active has no effect
- Sessions shorter than 5 seconds are discarded
- MVP does not include a pause function
- Users cannot edit or delete completed study sessions

## Study Session History
- Users can view their previous study sessions
- Each session displays its date and duration
- Users cannot edit or deleted completed study sessions

## Companion
- The MVP uses one companion creature.
-  The companion progresses through three visual growth stages: Newborn, Growing, and Mature.
- Each growth stage has its own visual design.
- The companion is the primary visual element of the application.
- Users can click or tap the companion to receive a message.
- Clicking or tapping the companion may trigger a visual response, such as a sprite change or animation.
- Companion customization is not included in the MVP.

## Companion Messages
- The companion displays encouragement messages based on its current growth stage.
- Messages can respond to how long it has been since the user's previous study session.
- Time-aware messages should acknowledge the user's return without negatively judging their absence.

## Companion Personality
- The companion's messages change as it grows.
- Newborn messages are simple, cute, and energetic.
- Growing messages are more confident and encouraging.
- Mature messages are calmer, more thoughtful, and occasionally philosophical.
- Messages are selected from predefined message pools for each growth stage.
- Time-aware messages can acknowledge the user's return after a period without a completed study session.
- Time-aware messages should be welcoming and should not guilt or negatively judge the user.

## MVP Acceptance Criteria

The MVP is considered complete when:

* [ ] Users can start and stop a study session
* [ ] The timer continues through page refreshes
* [ ] Closing the browser or tab ends and saves the active session
* [ ] Completed study sessions are saved with their date and duration
* [ ] Sessions shorter than 5 seconds are discarded
* [ ] XP is awarded correctly based on study duration
* [ ] XP and companion progress persist between visits on the same browser
* [ ] The companion evolves at 60 XP, 300 XP, and 1,500 XP
* [ ] XP continues accumulating after reaching the Mature stage
* [ ] Users can view their total XP and progress toward the next growth stage
* [ ] Users can view their previous study sessions
* [ ] The companion has three distinct visual growth stages
* [ ] Clicking or tapping the companion produces a message
* [ ] Messages change based on the companion's growth stage
* [ ] The companion can display time-aware messages based on the time since the user's last completed study session
* [ ] Time-aware messages do not guilt or negatively judge the user
* [ ] Users cannot edit or delete completed study sessions
* [ ] The MVP does not require an account or cross-device syncing


## Not in Scope
- User accounts
- Cross-device progress syncing
- Social features
- Leaderboards
- Multiple companions
- Complex game mechanics
- Achievements
- Mobile app
- AI conversations

