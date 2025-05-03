import { createSignal, onCleanup, onMount, type VoidComponent } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import clsx from 'clsx'

import IconButton from './material/IconButton'

const NavigationFooter: VoidComponent<{ class?: string }> = (props) => {
  const navigate = useNavigate()
  const [canGoBack, setCanGoBack] = createSignal(false)
  const [canGoForward, setCanGoForward] = createSignal(false)

  // Function to check if we can navigate back or forward
  const updateNavigationState = () => {
    setCanGoBack(window.history.length > 1 && window.history.state !== null)

    // The Navigation API is not widely supported yet, so we'll use a simple approach
    // We'll just enable the forward button if we've gone back at least once
    const sessionNav = sessionStorage.getItem('nav-history')
    const hasForwardHistory = sessionNav ? JSON.parse(sessionNav).hasGoneBack : false
    setCanGoForward(hasForwardHistory)
  }

  // Handle navigation
  const goBack = () => {
    if (canGoBack()) {
      // Store that we've gone back, so we can enable the forward button
      sessionStorage.setItem('nav-history', JSON.stringify({ hasGoneBack: true }))
      navigate(-1)
    }
  }

  const goForward = () => {
    if (canGoForward()) {
      // Reset the forward navigation state if we've used it
      const sessionNav = sessionStorage.getItem('nav-history')
      const navState = sessionNav ? JSON.parse(sessionNav) : {}

      // If we're at the end of our forward history, reset the state
      if (navState.forwardCount === undefined) {
        navState.forwardCount = 1
      } else {
        navState.forwardCount++
      }

      sessionStorage.setItem('nav-history', JSON.stringify(navState))
      navigate(1)
    }
  }

  onMount(() => {
    // Initial check
    updateNavigationState()

    // Listen for history changes
    window.addEventListener('popstate', updateNavigationState)

    // Create a MutationObserver to detect navigation changes
    // This helps us detect programmatic navigation (not just browser back/forward)
    const observer = new MutationObserver(() => {
      updateNavigationState()
    })

    // Observe changes to the URL
    observer.observe(document.querySelector('body')!, {
      childList: true,
      subtree: true
    })

    onCleanup(() => {
      window.removeEventListener('popstate', updateNavigationState)
      observer.disconnect()
    })
  })

  return (
    <div
      class={clsx(
        'fixed bottom-0 left-0 right-0 flex justify-center items-center gap-8 py-2 pb-safe z-50',
        'bg-surface-container-high/90 backdrop-blur-sm border-t border-outline/10 elevation-1',
        props.class
      )}
    >
      <IconButton
        name="arrow_back"
        onClick={goBack}
        class={clsx(
          'transition-opacity duration-200',
          canGoBack() ? 'opacity-100' : 'opacity-30 cursor-not-allowed'
        )}
      />
      <IconButton
        name="arrow_forward"
        onClick={goForward}
        class={clsx(
          'transition-opacity duration-200',
          canGoForward() ? 'opacity-100' : 'opacity-30 cursor-not-allowed'
        )}
      />
    </div>
  )
}

export default NavigationFooter
