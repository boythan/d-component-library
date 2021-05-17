## CLASSNAME

### NAMING 
#### SELECT
.d-select__container
.d-select__select
.d-select__label

#### input
.d-input__container
.d-input__input
.d-input__label

### ALL

className => use for container className
classNameLabel => for label
classNameSubLabel => for label

### INPUT

classNameInput => for input
classNameTextArea => for area

### OPTIONS

classNameOptionGroup
classNameOptionItem

## PROPS

label => for label
value => value for form
defaultValue => default value for form
placeholder => placeholder for form
onChange => handle change value
disabled => disabled or not
multiple => multiple option
dataSource => data list to select => [{id, label}]
variant: outline or standard .....
size: small, large .....

getLabel = (item) => item.label,
getKey = (item) => item.id,
getValue = (item) => item.id,

### BUTTON

content => custom text
iconName => name of icon in material
onClick = ()=> {}
