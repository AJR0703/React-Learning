
export function WorkoutHero({ workouts }) {
    return (
        <header className="wk-hero">
            <div>
                <h1 className="wk-hero-title">Your <span>Workouts</span></h1>
                <p className="wk-hero-sub">Track and Log Workouts Here</p>
            </div>
            <div className="wk-hero-stat">
                <b>{workouts.length}</b>
                <small>{workouts.length === 1 ? "session" : "sessions"}</small>
            </div>
        </header>
    )
}