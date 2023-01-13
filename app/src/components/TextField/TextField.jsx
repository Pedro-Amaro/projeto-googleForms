import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const TextFieldCustom = ({ type, fullwidth, style, id, label, variant, onChange, value}) => {
    return <TextField 
                        type={type}
                        fullwidth={fullwidth}
                        style={{
                            boxSizing: 'border-box',
                            marginBottom: '10px',
                            ...style
                        }}
                        id={id} 
                        label={label}
                        variant={variant}
                        onChange={onChange}
                        value={value}
            />;
}

TextFieldCustom.defaultProps = {
    type: 'text',
    fullwidth:false,
    style:{},
    id:"",
    label:"",
    variant:"outlined", 
    value:"",
    onChange: () => {}
}

TextFieldCustom.prototype = {
    type: PropTypes.string,
    fullwidth: PropTypes.bool,
    style: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default TextFieldCustom;