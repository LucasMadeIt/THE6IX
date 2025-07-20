# Memory Lane
Memory Lane is a web app that helps people preserve, relive, and share their most important memories as walkable 3D spaces.

## What It Does
* Users upload a video of a meaningful room
* The app generates a 3D walkable version using Gsplat
* Users can narrate or write stories linked to the space
* AI remembers details and answers natural language questions
* Family and friends can contribute their own memories

## How We Built It
* Gsplat for 3D scene rendering
* Google Gemini for memory narration and recall
* V0.dev for front-end development
* Selenium automation to wrap Vid2Scene (no public API)
* Twelve Labs for video understanding (experimental)

## Challenges
* Local rendering was too slow (30+ hours per scene)
* Built a custom wrapper to automate Vid2Scene via browser automation
* Learned and integrated unfamiliar tools under time pressure

## What's Next
* Add VR support
* Make objects in the scene clickable with voice or story links
* Create a simplified, narrated mode for elderly users
* Transition to Luma AI or similar for higher-quality rendering

## Team
Built at Hack the 6ix 2025.
