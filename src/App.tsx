import { createSignal, lazy, onCleanup, onMount, Show, type ParentComponent, type VoidComponent } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import { QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { getAppQueryClient } from '~/api/query-client'

import NavigationFooter from '~/components/NavigationFooter'
import { initIframePermissions, isInIframe } from '~/utils/iframe-helper'
import 'leaflet/dist/leaflet.css'

const Login = lazy(() => import('./pages/auth/login'))
const Logout = lazy(() => import('./pages/auth/logout'))
const Auth = lazy(() => import('./pages/auth/auth'))

const Dashboard = lazy(() => import('./pages/dashboard'))

import OfflinePage from '~/pages/offline'

export const Routes = () => (
  <>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/auth" component={Auth} />

    <Route path="/*dongleId" component={Dashboard} />
  </>
)

export const AppLayout: ParentComponent = (props) => {
  const [isOnline, setIsOnline] = createSignal(navigator.onLine)
  const [isIframe] = createSignal(isInIframe())

  const handleOnline = () => setIsOnline(true)
  const handleOffline = () => setIsOnline(false)

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  onMount(() => {
    // Initialize iframe permissions if needed
    void initIframePermissions()

    // Log iframe status
    console.log('App running in iframe:', isIframe())
  })

  onCleanup(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })

  return (
    <Show when={isOnline()} fallback={<OfflinePage />}>
      <div class="pb-14"> {/* Add padding to the bottom to account for the navigation footer */}
        {props.children}
      </div>
      <NavigationFooter />
    </Show>
  )
}

const queryClient = getAppQueryClient()

const App: VoidComponent = () => (
  <QueryClientProvider client={queryClient}>
    <SolidQueryDevtools />
    <Router root={AppLayout}>
      <Routes />
    </Router>
  </QueryClientProvider>
)

export default App
