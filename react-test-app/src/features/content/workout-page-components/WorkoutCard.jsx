function formatStats({sets, reps, weight}) {
    const setsReps = [sets, reps].filter(Boolean).join(" × ");
    const load = weight ? `${weight}kg` : "";
    return [setsReps, load].filter(Boolean).join(" · ");
}

export function WorkoutCard({ workout, handleDelete }) {
    return (
        <article key={workout.workoutId} className="wk-card">
            <div className="wk-card-head">
                <div>
                    <h2 className="wk-card-name">{workout.workoutName}</h2>
                    <p className="wk-card-count">
                        {(workout.exercises?.length ?? 0)}{" "}
                        {workout.exercises?.length === 1 ? "exercise" : "exercises"}
                    </p>
                </div>
                <button
                    className="wk-del"
                    aria-label={`Delete ${workout.workoutName}`}
                    onClick={() => handleDelete(workout.workoutId)}
                >
                    ✕
                </button>
            </div>

            {workout.exercises?.length ? (
                <ul className="wk-log">
                    {workout.exercises.map((ex, i) => (
                        <li key={i}>
                            <span className="wk-ex-name">
                                {ex.name || "Exercise"}
                            </span>
                            <span className="wk-ex-stat">
                                {formatStats(ex)}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="wk-ex-empty">No exercises added.</p>
            )}
        </article>
    )
}