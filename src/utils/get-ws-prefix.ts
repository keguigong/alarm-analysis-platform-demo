export default function getWsPrefix() {
  const {
    domain,
    location: { protocol }
  } = document
  if (protocol === 'https:') return 'wss://' + domain
  else return 'ws://' + domain
}
