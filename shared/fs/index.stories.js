// @flow
import React from 'react'
import * as Types from '../constants/types/fs'
import * as Constants from '../constants/fs'
import {action, storiesOf, createPropProvider} from '../stories/storybook'
import {globalColors} from '../styles'
import Files from '.'
import FilePreview from './filepreview'

const provider = createPropProvider({
  FileRow: ({path}: {path: Types.Path}) => ({
    name: Types.getPathName(path),
    onOpen: () => {},
    openInFileUI: () => {},
    type: 'folder',
    itemStyles: {
      iconSpec: {
        type: 'basic',
        iconType: 'icon-folder-private-32',
        iconColor: globalColors.darkBlue2,
      },
      textColor: globalColors.darkBlue,
      textType: 'BodySemibold',
    },
  }),
  Footer: () => ({
    downloads: [],
  }),
  FolderHeader: () => ({
    breadcrumbItems: [
      {
        name: 'keybase',
        path: '/keybase',
      },
    ],
    dropdownItems: [],
    isTeamPath: false,
    path: Types.stringToPath('/keybase'),
    onBack: action('onBack'),
    onOpenBreadcrumb: action('onOpenBreadcrumb'),
    onOpenBreadcrumbDropdown: action('onOpenBreadcrumbDropdown'),
  }),
  SortBar: ({path}: {path: Types.Path}) => ({
    sortSetting: {
      sortBy: 'name',
      sortOrder: 'asc',
    },
    onOpenSortSettingPopup: () => {},
    folderIsPending: true,
  }),
  FilesBanner: () => ({
    path: Types.stringToPath('/keybase'),
    kbfsEnabled: true,
    showBanner: false,
    inProgress: false,
    showSecurityPrefs: false,
    getFuseStatus: action('getFuseStatus'),
    onDismiss: action('onDismiss'),
    onInstall: action('onInstall'),
    onUninstall: action('onUninstall'),
  }),
})

const load = () => {
  storiesOf('Files', module)
    .addDecorator(provider)
    .add('Root', () => (
      <Files
        path={Types.stringToPath('/keybase')}
        progress="loaded"
        items={[
          Types.stringToPath('/keybase/private'),
          Types.stringToPath('/keybase/public'),
          Types.stringToPath('/keybase/team'),
        ]}
      />
    ))
    .add('Preview', () => (
      <FilePreview
        fileUIEnabled={false}
        pathItem={Constants.makeFile({
          name: 'bar.jpg',
          size: 10240,
          lastWriter: {uid: '', username: 'foo'},
        })}
        itemStyles={Constants.getItemStyles(['keybase', 'private', 'foo', 'bar.jpg'], 'file', 'foo')}
        onAction={() => {}}
        onBack={() => {}}
        onDownload={() => {}}
        onShowInFileUI={() => {}}
        onShare={() => {}}
        onSave={() => {}}
      />
    ))
}

export default load
