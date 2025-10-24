# 享+社区 (Enjoy Plus) - AI Coding Instructions

## Project Overview

This is a **WeChat Mini Program** for community property management using Vant Weapp UI framework. The app handles house registration, repair requests, and visitor management with a tab-based navigation structure.

## Architecture & File Structure

### Core Structure

- `miniprogram/` - Main mini program source code
- `miniprogram/app.js` - Application entry point (minimal global data setup)
- `miniprogram/app.json` - App configuration with subpackage routing
- `miniprogram/app.scss` - Global styles with Vant theme customization

### Subpackage Pattern

The app uses **subpackages** for feature isolation:

- `house_pkg/` - House registration & management
- `repair_pkg/` - Maintenance request system
- `visitor_pkg/` - Visitor management

Each subpackage follows: `pages/[feature]/index.[js|json|scss|wxml]`

### Page Structure Convention

Every page consists of 4 files:

- `index.js` - Page logic with `Page({})` constructor
- `index.wxml` - Template using Vant components
- `index.scss` - Page-specific styles
- `index.json` - Page configuration

## Key Patterns

### Component Usage

Always use **Vant Weapp** components with `van-` prefix:

```wxml
<van-cell-group title="房屋信息">
  <van-cell title="房间号" value="1号楼1单元101室" />
</van-cell-group>
```

### Status Tags Pattern

Use consistent status classes in templates:

```wxml
<text class="tag success">审核通过</text>
<text class="tag info">正在审核</text>
<text class="tag fail">审核失败</text>
```

### Navigation Patterns

- Main pages: `wx.navigateTo()`
- Between subpackages: Use full paths like `/house_pkg/pages/detail/index`
- Tab switching: `wx.reLaunch()` for tab pages

### Data Layer Management

Pages use `setData()` for state updates:

```javascript
// Show/hide modals
this.setData({ dialogVisible: true })

// Handle component events
swipeClose(ev) {
  const { position, instance } = ev.detail
  if (position === 'right') {
    this.setData({ dialogVisible: true })
    instance.close()
  }
}
```

## Styling Conventions

### Custom Icon Font

Use `enjoy-icon` class with specific icons:

```wxml
<text class="enjoy-icon icon-add"></text>
<text class="enjoy-icon icon-repair"></text>
```

### Global CSS Variables

Vant theme customization via CSS variables in `app.scss`:

```scss
--cell-font-size: 28rpx;
--cell-vertical-padding: 28rpx;
--picker-confirm-action-color: #5591af;
```

### Layout Patterns

- Fixed bottom toolbar: `.toolbar` class with `env(safe-area-inset-bottom)`
- Scroll views: Always use `<scroll-view enhanced show-scrollbar="{{false}}" scroll-y>`
- Empty states: `.blank` class with background image

## Development Workflow

### File Creation

When adding new features:

1. Create subpackage directory if needed
2. Add page route to `app.json` subPackages
3. Create all 4 page files (js/json/scss/wxml)
4. Import required Vant components in page json

### Component Integration

Register Vant components globally in `app.json`:

```json
"usingComponents": {
  "van-cell": "@vant/weapp/cell/index",
  "van-dialog": "@vant/weapp/dialog/index"
}
```

### Code Standards

- Use **Prettier** config: no semicolons, single quotes, 120 char width
- ESLint with WeChat Mini Program globals (wx, Page, App, Component)
- 2-space indentation for all files

## Key Integration Points

### Swipe Actions

Use `van-swipe-cell` with `async-close` for delete actions:

```wxml
<van-swipe-cell async-close bind:close="swipeClose" right-width="70">
  <!-- content -->
  <view slot="right">删除</view>
</van-swipe-cell>
```

### Modal Management

Common pattern for layered UI interactions:

```javascript
// Open/close layer methods
openHouseLayer() {
  this.setData({ houseLayerVisible: true })
}
```

### Form Handling

Use `van-field` within `van-cell-group` structure:

```wxml
<van-cell-group title="报修信息">
  <van-field label="手机号码" type="number" placeholder="请输入联系电话号码" />
</van-cell-group>
```

When working on this codebase, maintain the established subpackage structure, use Vant components consistently, and follow the 4-file page pattern for all new features.
