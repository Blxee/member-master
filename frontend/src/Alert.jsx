export default function Alert({ children, type, show }) {
  if (type === 'error') {
    type = 'danger'
  }

  return (
    <div className={`alert alert-${type || 'primary'} alert-dismissible fade position-fixed top-0 start-50 translate-middle-x mt-3 ${show ? 'show' : ''}`} role="alert">
      {children}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
}
