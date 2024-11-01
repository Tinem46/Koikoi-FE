import  { useState, useEffect } from 'react';
import api from '../../config/api';
import './index.scss';

const Feedback = ({ fishId }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');

    useEffect(() => {
        fetchFeedbacks();
    }, [fishId]);

    const fetchFeedbacks = async () => {
        try {
            // Update the endpoint to include fishId in the query
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
                feedBackContent: newFeedback,
                fishId: fishId
            });
            setNewFeedback('');
            fetchFeedbacks();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="feedback-container">
            <h2>Customer Feedbacks</h2>
            
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
                {feedbacks.map((feedback, index) => (
                    <div key={index} className="feedback-item">
                        <p>{feedback.feedBackContent}</p>
                        <span className="feedback-date">
                            {new Date(feedback.createdDate).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
