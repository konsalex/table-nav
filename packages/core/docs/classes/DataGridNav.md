[@table-nav/core](../README.md) / [Exports](../modules.md) / DataGridNav

# Class: DataGridNav

## Table of contents

### Constructors

- [constructor](DataGridNav.md#constructor)

### Properties

- [debug](DataGridNav.md#debug)
- [pageUpDown](DataGridNav.md#pageupdown)

### Methods

- [cellNavigation](DataGridNav.md#cellnavigation)
- [disable](DataGridNav.md#disable)
- [enable](DataGridNav.md#enable)
- [gridNavigation](DataGridNav.md#gridnavigation)
- [tableKeyDown](DataGridNav.md#tablekeydown)
- [tableKeyUp](DataGridNav.md#tablekeyup)

## Constructors

### constructor

• **new DataGridNav**()

#### Defined in

[index.ts:22](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L22)

• **new DataGridNav**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../modules.md#config) |

#### Defined in

[index.ts:23](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L23)

## Properties

### debug

• `Readonly` **debug**: `boolean`

#### Defined in

[index.ts:20](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L20)

___

### pageUpDown

• `Readonly` **pageUpDown**: `undefined` \| `number`

#### Defined in

[index.ts:17](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L17)

## Methods

### cellNavigation

▸ **cellNavigation**(`e`): `void`

Handles the navigation inside a cell

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[index.ts:125](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L125)

___

### disable

▸ **disable**(): `void`

Disables the keyboard listener in cases
that elements inside the grid need to use
arrows keys etc., like select dropdowns

#### Returns

`void`

#### Defined in

[index.ts:42](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L42)

___

### enable

▸ **enable**(): `void`

Enables the keyboard listeners

#### Returns

`void`

#### Defined in

[index.ts:49](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L49)

___

### gridNavigation

▸ **gridNavigation**(`e`): `void`

Handles the navigation outside a cell
on the grid level

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[index.ts:201](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L201)

___

### tableKeyDown

▸ **tableKeyDown**(`e`): `void`

Used as a keyboard listener for key down

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

[index.ts:66](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L66)

___

### tableKeyUp

▸ **tableKeyUp**(): `void`

Used as a keyboard listener for key up

#### Returns

`void`

#### Defined in

[index.ts:58](https://github.com/konsalex/table-nav-interim-repo-private/blob/5980999/packages/core/src/index.ts#L58)
