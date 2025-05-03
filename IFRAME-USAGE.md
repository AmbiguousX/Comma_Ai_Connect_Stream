# Connect App Iframe Integration Guide

This guide explains how to embed the Connect app in an iframe with full functionality, including camera access.

## Overview

The Connect app has been configured to work seamlessly within an iframe, allowing you to embed it in another website while maintaining all functionality, including:

- Camera access
- Geolocation
- Full navigation
- All app features

## Implementation

### Basic Iframe Implementation

```html
<iframe 
  src="https://your-deployment-url.com" 
  allow="camera; microphone; geolocation; fullscreen"
  allowfullscreen
  title="Connect App">
</iframe>
```

### Styling Recommendations

For responsive design, you can use a container with aspect ratio:

```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    src="https://your-deployment-url.com" 
    allow="camera; microphone; geolocation; fullscreen"
    allowfullscreen
    title="Connect App">
  </iframe>
</div>
```

## Important Notes

1. **HTTPS Required**: For camera and geolocation access, both the parent site and the iframe must use HTTPS in production.

2. **Permissions**: The first time a user accesses camera or geolocation features, they will be prompted for permission.

3. **Performance**: The iframe implementation has been optimized for performance, with minimal overhead compared to direct access.

4. **Cross-Origin**: All necessary CORS headers have been configured to allow cross-origin embedding.

## Example Implementation

An example HTML file (`iframe-example.html`) is included in this repository to demonstrate the iframe implementation.

To test it:

1. Deploy your Connect app
2. Open the `iframe-example.html` file
3. Replace the iframe src URL with your deployment URL
4. Open the HTML file in a browser

## Troubleshooting

If you encounter issues with permissions:

1. Ensure both the parent site and iframe use HTTPS
2. Check that the `allow` attribute includes all required permissions
3. Verify that the user has granted permissions when prompted
4. Check browser console for any error messages

## Browser Compatibility

This iframe implementation has been tested and works in:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Older browsers may have limited functionality, particularly with camera access in iframes.
