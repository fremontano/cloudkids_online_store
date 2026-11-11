
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingProps {
    value: number;
    text?: string;
}

export const Rating = ({ value, text }: RatingProps) => {
    return (
        <div className="inline-flex items-center gap-1.5">
            <div className="flex items-center text-xs">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                        {value >= star ? (
                            <FaStar className="text-amber-400" />
                        ) : value >= star - 0.5 ? (
                            <FaStarHalfAlt className="text-amber-400" />
                        ) : (
                            <FaRegStar className="text-amber-400" />
                        )}
                    </span>
                ))}
            </div>

            {text && <span className="text-[10px] leading-none text-gray-500">{text}</span>}
        </div>
    );
};
