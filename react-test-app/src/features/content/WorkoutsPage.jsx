import NavigationBar from "../../components/ui/Nav-Bar.jsx";
import {useEffect, useState} from "react";
import {createWorkout, listWorkouts, removeWorkout} from "../../api/workoutApi.js";
import {Spinner} from "react-bootstrap";
import {WorkoutForm} from "./workout-page-components/WorkoutForm.jsx";
import "./WorkoutsPage.css";
import {WorkoutCard} from "./workout-page-components/WorkoutCard.jsx";
import {WorkoutHero} from "./workout-page-components/WorkoutHero.jsx";

export function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [createError, setCreateError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        listWorkouts()
            .then((items) => setWorkouts(items ?? []))
            .catch(() => setError("Couldn't load your workouts. Refresh to try again."))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (workoutId) => {
        await removeWorkout(workoutId);
        setWorkouts((prev) => prev.filter((w) => w.workoutId !== workoutId));
    };

    const handleCreateNewWorkout = async ({workoutName, exercises}) => {
        setCreateError(null);
        setSubmitting(true);
        try {
            const created = await createWorkout({workoutName, exercises});
            setWorkouts((prev) => [...prev, created]);
            setShowForm(false);
        } catch {
            setCreateError("Couldn't save that workout. Check the fields and try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="wk-page">
            <NavigationBar pageTitle="Workouts"/>

            <WorkoutHero workouts={workouts}/>

            {loading && <div style={{padding: "40px 28px"}}><Spinner/></div>}
            {error && <div className="wk-alert" style={{margin: "24px 28px"}}>{error}</div>}

            {!loading && !error && (
                <>
                    {workouts.length > 0 && (
                        <div className="wk-toolbar">
                            <button
                                className={showForm ? "wk-btn wk-btn-ghost" : "wk-btn"}
                                onClick={() => setShowForm((v) => !v)}
                            >
                                {showForm ? "Close" : "+ New workout"}
                            </button>
                        </div>
                    )}

                    {workouts.length === 0 && !showForm ? (
                        <div className="wk-empty">
                            <h3>No workouts yet</h3>
                            <p>Build your first session and it'll show up here.</p>
                            <button className="wk-btn" onClick={() => setShowForm(true)}>
                                + Create a workout
                            </button>
                        </div>
                    ) : (
                        <div className="wk-grid">
                            {workouts.map((w) => (
                                <WorkoutCard workout={w} handleDelete={handleDelete}/>
                            ))}
                        </div>
                    )}

                    {showForm && (
                        <WorkoutForm
                            onSubmit={handleCreateNewWorkout}
                            error={createError}
                            submitting={submitting}
                        />
                    )}
                </>
            )}
        </div>
    );
}