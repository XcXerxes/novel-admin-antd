export function getAuthority() {
  // admin || user
  return localStorage.getItem('ant-design-authority') || 'admin'
}