import { faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapLocation, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="container-fluid d-grid gap-3 mt-auto p-4 bg-dark text-white">
      <h4>thank you for visiting MemberMaster.</h4>
      <div className='row row-cols-3 justify-content-between'>

        <div className='col-1'>
          <img className='h-100' src="/membermaster-gray.svg" alt='MemberMaster Logo' />
        </div>

        <div className='col-auto'>
          <h5>Follow us:</h5>
          <div>
            <FontAwesomeIcon className='me-2' icon={faTwitter} size='lg' color='white' />
            <b>Twitter:</b> <a href='#'>@membermaster</a>
          </div>
          <div>
            <FontAwesomeIcon className='me-2' icon={faInstagram} size='lg' color='white' />
            <b>Instagram:</b> <a href='#'>@membermaster</a>
          </div>
          <div>
            <FontAwesomeIcon className='me-2' icon={faYoutube} size='lg' color='white' />
            <b>YouTube:</b> <a href='#'>MemberMaster official</a>
          </div>
        </div>

        <div className='col-auto'>
          <h5>Get in touch:</h5>
          <div>
            <FontAwesomeIcon className='me-2' icon={faEnvelope} size='lg' color='white' />
            <b>E-mail:</b> <a href='#'>contact@membermaster.com</a>
          </div>
          <div>
            <FontAwesomeIcon className='me-2' icon={faPhone} size='lg' color='white' />
            <b>Phone:</b> <a href='#'>+212-123456789</a>
          </div>
          <div>
            <FontAwesomeIcon className='me-2' icon={faMapLocation} size='lg' color='white' />
            <b>Location:</b> <a href='#'>123 Main Street, Anytown, USA 12345</a>
          </div>
        </div>

      </div>
      <hr className="border-2"/>
      <h4>© 2024 Copyright: MemberMaster</h4>
    </footer>
  )
}
