import React,{useState} from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import moment from 'moment-timezone';

function SelectDate({selectedValue}) {

    const [selectedHint, setSelectedHint] = useState('')

    const handleDateChange = (e) => {
        setSelectedHint(e.target.value)
    }
   
    return (
        <>
            <FormControl variant="outlined" className='col-md-2 mr-2 mb-2'>
                <InputLabel htmlFor="select-date">날짜</InputLabel>
                <Select
                    defaultValue=""
                    native
                    onChange={handleDateChange}
                    inputProps={{
                        id: 'select-date'
                    }}
                >
                    <option aria-label="선택해주세요" value="" />
                    {
                        selectedValue.prices.map((detail, i) =>
                            <option key={detail._id} value={detail.hint}>
                                {moment(detail.updateDate).tz('Asia/Seoul').format('YYYY-MM-DD')}
                            </option>)
                    }
                </Select>
            </FormControl>

            <TextField
                className='col-md-4'
                label='뉴스'
                value={selectedHint === 'default' ? "" : selectedHint}
                id={`${selectedValue.stockName}hint`}
                variant="outlined"
            />
        </>
    )
}

export default SelectDate;
