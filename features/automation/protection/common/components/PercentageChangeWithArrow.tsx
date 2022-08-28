import { Icon } from "@makerdao/dai-ui-icons";
import { Box, Flex, Text } from "theme-ui";

interface PercentageChangeWithArrowProps {
    heading: string;
    from: number;
    to: number;
}

export function PercentageChangeWithArrow ({ heading, from, to }: PercentageChangeWithArrowProps) {
    <Box>
        <Text
            sx={{
                color: 'neutral80',
                fontSize: 1,
                fontWeight: 'semiBold'
            }}
        >
            {heading}
        </Text>
        <Flex>
            <Text
                sx={{
                    fontWeight: 'semiBold',
                    fontSize: 4
                }}
            >
                {from.toString()}%
            </Text>
            <Icon
                name="arrow_right"
                size="15px"
                sx={{ position: 'relative', left: '6px', transition: '0.2s' }}
              />
            <Text
            sx={{
                fontWeight: 'semiBold',
                fontSize: 4,
                color: 'success100'
            }}
            >
                {to.toString()}%
            </Text>
        </Flex>
    </Box>
}