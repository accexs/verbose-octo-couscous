import Link from 'next/link'
import Image from 'next/image'
import mainLogo from '../../../public/star-wars-logo.svg'

const Logo = () => {
  return (
    <Link href={'/'} className={'flex items-center text-dark'}>
      <div
        className={
          'mr-4 w-32 overflow-hidden '
        }
      >
        <Image
          src={mainLogo}
          alt={'profile image'}
          className={'h-auto w-full'}
        />
      </div>
    </Link>
  )
}

export default Logo
