import {useState} from "react";
import {Form} from "react-bootstrap";

const EMPTY_EXERCISE = {name: "", sets: "", reps: "", weight: ""};

export function WorkoutForm({onSubmit, error, submitting}) {
    const [workoutName, setWorkoutName] = useState("");
    const [exercises, setExercises] = useState([{...EMPTY_EXERCISE}]);

    const addExercise = () =>
        setExercises((prev) => [...prev, {...EMPTY_EXERCISE}]);

    const removeExercise = (index) =>
        setExercises((prev) => prev.filter((_, i) => i !== index));

    const updateExercise = (index, field, value) =>
        setExercises((prev) =>
            prev.map((ex, i) => (i === index ? {...ex, [field]: value} : ex))
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({workoutName, exercises});
    };

    return (
        <section className="wk-form-panel">
            <h3>Build a workout</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="workoutForm.WorkoutName">
                    <label className="wk-label" htmlFor="workoutForm.WorkoutName">
                        Workout name
                    </label>
                    <Form.Control
                        name="workoutName"
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        placeholder="e.g. Push Day"
                    />
                </Form.Group>

                <span className="wk-label">Exercises</span>
                {exercises.map((ex, i) => (
                    <div key={i} className="wk-ex-row">
                        <Form.Select
                            value={ex.name}
                            onChange={(e) => updateExercise(i, "name", e.target.value)}
                        >
                            <option value="">Select…</option>
                            <option value="Bench Press">Bench Press</option>
                            <option value="Overhead Press">Overhead Press</option>
                            <option value="Squat">Squat</option>
                            <option value="Deadlift">Deadlift</option>
                        </Form.Select>
                        <Form.Control type="number" placeholder="Sets"
                                      value={ex.sets}
                                      onChange={(e) => updateExercise(i, "sets", e.target.value)}/>
                        <Form.Control type="number" placeholder="Reps"
                                      value={ex.reps}
                                      onChange={(e) => updateExercise(i, "reps", e.target.value)}/>
                        <Form.Control type="number" placeholder="Weight"
                                      value={ex.weight}
                                      onChange={(e) => updateExercise(i, "weight", e.target.value)}/>
                        <button className="wk-del" type="button"
                                aria-label="Remove exercise"
                                onClick={() => removeExercise(i)}
                                disabled={exercises.length === 1}>
                            ✕
                        </button>
                    </div>
                ))}

                <div className="wk-form-actions">
                    <button className="wk-btn wk-btn-ghost" type="button" onClick={addExercise}>
                        + Add exercise
                    </button>
                </div>

                {error && <div className="wk-alert">{error}</div>}

                <div className="wk-form-actions">
                    <button className="wk-btn" type="submit" disabled={submitting}>
                        {submitting ? "Saving…" : "Create workout"}
                    </button>
                </div>
            </Form>
        </section>
    );
}