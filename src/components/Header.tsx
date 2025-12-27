
import LogoLarge from '../assets/images/logo-large.svg'
import LogoSmall from '../assets/images/logo-small.svg'
import Trophy from '../assets/images/icon-personal-best.svg'

type Props = {
    score: number
}

const Header = ({score}: Props) => {

    return (
        <nav className="flex items-center justify-between">
            <div className="">
                <img src={LogoLarge} alt="test typing logo large" className='hidden md:block' />
                <img src={LogoSmall} alt="test typing logo small" className='block md:hidden' />
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <img src={Trophy} alt="new personal best trophy" />
                    <p className='hidden md:block text-[#949497] text-base'>Personal best: <span className='text-white'>{score} WPM</span></p>
                    <p className='block md:hidden text-[#949497] text-base'>Best: <span className='text-white'>{score} WPM</span></p>
                </div>
            </div>
        </nav>
    )
}

export default Header