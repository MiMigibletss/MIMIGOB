import React from 'react';
import { Box, Text } from 'grommet';

const generatedTime = (time) => time ? `${time} milliseconds` : ''

const Stats = ({ data: { timespent, version, nonce, str, date } }) => {
    return <Box align="stretch" justify="center" flex="shrink" basis="medium" direction="column" round="medium" fill="vertical" background={{ "dark": false, "color": "brand", "opacity": "medium" }} overflow="visible" pad="xsmall">
        <Text><strong>난이도:</strong> {version} </Text>
        <Text><strong>소요시간:</strong> {generatedTime(timespent)}</Text>
        <Text truncate={true}><strong>해시:</strong> {str} </Text>
        <Text><strong>넌스:</strong> {nonce} </Text>
        <Text truncate={true}><strong>생성시간:</strong> {date ? new Intl.DateTimeFormat('en', {
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZoneName: 'short'
        }).format(date) : ''}</Text>
    </Box>
}

export default Stats;