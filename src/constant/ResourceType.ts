/**
 * resourceType
 *
 * C catalog
 * R router
 * F function
 */
export type ResourceType = {
    C: 'C';
    R: 'R';
    F: 'F';
};

/**
 * @description parse resourceType
 *
 * @param param string 'C' | 'R' | 'F'
 * @return string 'C' | 'R' | 'F' | 'UNKNOWN'
 */
export const ParseResourceType = (param: keyof ResourceType): string => {
    switch (param) {
        case 'C':
            return '目录';
        case 'R':
            return '路由';
        case 'F':
            return '功能';
        default:
            return 'UNKNOWN';
    }
};
