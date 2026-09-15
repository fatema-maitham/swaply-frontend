import { Link } from 'react-router';

const SwapCard = ({ swap }) => {
  return (
    <li className="swap-card">
      <div className="swap-card-header">
        <span className={`swap-status ${swap.status}`}>
          {swap.status}
        </span>
      </div>

      <div className="swap-card-skills">
        <div className="swap-skill">
          <span>OFFERING</span>
          <h2>{swap.skillOffered?.name}</h2>
        </div>

        <div className="swap-arrow">↔</div>

        <div className="swap-skill">
          <span>REQUESTING</span>
          <h2>{swap.skillRequested?.name}</h2>
        </div>
      </div>

      <div className="swap-card-info">
        <div>
          <span>Requester</span>
          <p>{swap.requester?.name}</p>
        </div>

        <div>
          <span>Receiver</span>
          <p>{swap.receiver?.name}</p>
        </div>
      </div>

      <Link
        to={`/swaps/${swap._id}`}
        className="swap-card-button"
      >
        View Details
      </Link>
    </li>
  );
};

export default SwapCard;