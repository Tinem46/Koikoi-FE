import { useState, useEffect } from 'react';
import api from '../../config/api';
import './index.scss';

import BackgroundFeedback from "../../assets/image/BackgroundFeedback.webp";
const Feedback = ({ fishId }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');
    const[feedbackDay, setFeedbackDay] = useState('');

    useEffect(() => {
        fetchFeedbacks();
    }, [fishId]);

    const fetchFeedbacks = async () => {
        try {
            const response = await api.get(`feedback?fishId=${fishId}`);
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('feedback', {
                email: "string",
                feedBackContent: newFeedback,
                dateFeedback: new Date().toISOString()
            });
            setNewFeedback('');
            setFeedbackDay(new Date().toISOString());
            fetchFeedbacks();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="feedback-page">
            <img src={BackgroundFeedback} className='Background'/>
            <div className="feedback-container">
                <h1 className="feedback-header">Customer Feedback</h1>
                <p className="feedback-subtitle">
                    Share your thoughts about this fish and see what others have to say.
                </p>

                <form onSubmit={handleSubmit} className="feedback-form">
                    <textarea
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        required
                    />
                    <button type="submit">Submit Feedback</button>
                </form>

                <div className="feedback-list">
                    {feedbacks.length > 0 ? (
                        feedbacks.map((feedback, index) => (
                            <div key={index} className="feedback-item">
                                <p>{feedback.email}</p>
                                <p>{feedback.feedBackContent}</p>
                                <span className="feedback-date">
                                    {new Date(feedback.feedBackDay).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="feedback-empty">No feedback available yet. Be the first to share your experience!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
