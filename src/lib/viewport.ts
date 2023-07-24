export default function viewport(node: HTMLElement, options?: IntersectionObserverInit | undefined) {
  function dispatchEvent(entry: IntersectionObserverEntry) {
    const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport'
    entry.target.dispatchEvent(new Event(eventName))
  }

  const observer = new IntersectionObserver((entries) => entries.forEach(dispatchEvent), options)

  observer.observe(node)

  observer.takeRecords().forEach(dispatchEvent)

  return {
    destroy: () => {
      observer.disconnect()
    },
  }
}
