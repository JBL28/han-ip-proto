export function AppCard({ as: Component = 'section', className = '', children, ...props }) {
  const classes = ['app-card', className].filter(Boolean).join(' ');
  return <Component className={classes} {...props}>{children}</Component>;
}
