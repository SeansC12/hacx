# HacX

## Setup
1. Go to `/client` directory, run `npm i`, then run `npm run dev`
2. Go to `/server` directory, create a venv named `.venv`, sync packages, and run `python app.py`

## Notes
1. As long as both servers are running, you may call the Flask server by `fetch("/api/")` directly as the requests from Next.js are configured to reroute to the Flask server
