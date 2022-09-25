export function formatSex(row: any, col: any, val: any) {
    var num = parseInt(val)
    let text = ''
    switch (num) {
        case 0:
            text = '未知'
            break
        case 1:
            text = '男'
            break
        case 2:
            text = '女'
            break
        default:
            break
    }
    return text
}
export function formatState(row: any, col: any, val: any) {
    var num = parseInt(val)
    let text = ''
    switch (num) {
        case 0:
            text = '上班中'
            break
        case 1:
            text = '下班'
            break
        case 2:
            text = '离职'
            break
        case 3:
            text = '入职'
            break
        default:
            break
    }
    return text
}
