import { MdOutlineStarPurple500 } from 'react-icons/md';
import { RiMovie2AiLine } from 'react-icons/ri';
import './styles.scss';

export const Logo = () => (
    <div className='logo'>
        <div className='center br'>
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
        </div>
        <h1 className='center'>
            <RiMovie2AiLine />
            cine<span className='cursive'>bingo</span>
        </h1>
    </div>
);
