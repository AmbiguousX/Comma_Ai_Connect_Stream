/**
 * Helper functions for iframe-related functionality
 */

/**
 * Check if the application is running inside an iframe
 */
export const isInIframe = (): boolean => {
  try {
    return window.self !== window.top
  } catch (e) {
    // If we can't access window.top, we're definitely in an iframe
    return true
  }
}

/**
 * Request camera permissions explicitly
 * This is especially important when running in an iframe
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })

    // Stop the stream immediately after getting permission
    stream.getTracks().forEach(track => track.stop())

    return true
  } catch (error) {
    console.error('Error requesting camera permission:', error)
    return false
  }
}

/**
 * Request geolocation permissions explicitly
 */
export const requestGeolocationPermission = async (): Promise<boolean> => {
  try {
    await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return true
  } catch (error) {
    console.error('Error requesting geolocation permission:', error)
    return false
  }
}

/**
 * Initialize all necessary permissions for iframe functionality
 *
 * Note: This function no longer automatically requests permissions
 * on load. Instead, permissions will be requested only when needed
 * by specific features.
 */
export const initIframePermissions = async (): Promise<void> => {
  if (isInIframe()) {
    console.log('Application running in iframe, ready for permission requests when needed')

    // We no longer automatically request permissions on load
    // Permissions will be requested by specific features when needed
  }
}
