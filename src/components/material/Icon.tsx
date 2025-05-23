import { type VoidComponent } from 'solid-js'
import clsx from 'clsx'

// Specify icon names to load only the necessary icons, reducing font payload.
// https://developers.google.com/fonts/docs/material_symbols#optimize_the_icon_font
// biome-ignore format: the array should not be formatted
export const Icons = [
  'add', 'arrow_back', 'arrow_forward', 'camera', 'check', 'chevron_right', 'clear', 'close', 'delete', 'description', 'directions_car', 'download', 'error',
  'file_copy', 'flag', 'info', 'keyboard_arrow_down', 'keyboard_arrow_up', 'local_fire_department', 'logout', 'menu', 'my_location',
  'open_in_new', 'payments', 'person', 'progress_activity', 'satellite_alt', 'search', 'settings', 'upload', 'videocam', 'refresh',
  'login', 'person_off', 'autorenew', 'close_small', 'pause', 'play_arrow', 'clear_all',
] as const

export type IconName = (typeof Icons)[number]

export type IconProps = {
  class?: string
  name: IconName
  filled?: boolean
  size?: '20' | '24' | '40' | '48'
}

/**
 * Use an icon from the Material Symbols library.
 *
 * Note: Icon names <strong>must</strong> be added to the icons list in vite.config.ts.
 *
 * @see https://fonts.google.com/icons
 */
const Icon: VoidComponent<IconProps> = (props) => {
  // size-20, 24 etc. defined in root.css
  const size = () => `size-${props.size || '24'}`
  return (
    <span class={clsx('material-symbols-outlined flex', props.filled ? 'icon-filled' : 'icon-outline', size(), props.class)}>
      {props.name}
    </span>
  )
}

export default Icon
