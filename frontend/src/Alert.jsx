export default function Alert({ children, type }) {
  if (type === 'error') {
    type = 'danger'
  }

  return (
    <div className={`alert alert-${type || 'primary'} fade position-fixed top-0 start-50 translate-middle-x mt-3 show`} role="alert">
      {children}
      {/* alert-dismissible  */}
      {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
    </div>
  );
}
