import '../../styles/boxStyle.scss'

export enum BoxStyle {
  DEFAULT_TAG = 'DEFAULT_TAG',
  WAIT_TAG = 'WAIT_TAG',
  PROCEEDING_TAG = 'PROCEEDING_TAG',
  DONE_TAG = 'DONE_TAG',
  BADGE = 'BADGE',
}

interface Props {
  boxStyle: BoxStyle
  // children?: React.ReactNode
}

export default function BoxStore({
  boxStyle,
  // children,
}: Props) {
  const selectBox = () => {
    switch (boxStyle) {
      case BoxStyle.DEFAULT_TAG:
        return (
          <div className="tag flex border-solid border-[1px] border-gray-300 bg-gray-50 text-gray-700 capitalize leading-[1px] font-Pretendard">
            설치
          </div>
        )
      case BoxStyle.WAIT_TAG:
        return (
          <div className="tag flex border-solid border-[1px] border-gray-500 bg-gray-100 text-gray-700 capitalize leading-[1px] font-Pretendard">
            <div className="w-2 h-2 rounded-lg bg-gray-500" />
            대기
          </div>
        )
      case BoxStyle.PROCEEDING_TAG:
        return (
          <div className="tag flex border-solid border-[1px] bg-green-50 border-green-500 text-gray-700 capitalize leading-[1px] font-Pretendard">
            <div className="w-2 h-2 rounded-lg bg-green-500" />
            진행중
          </div>
        )
      case BoxStyle.DONE_TAG:
        return (
          <div className="tag flex border-solid border-[1px] bg-blue-50 border-blue-500 text-gray-700 capitalize leading-[1px] font-Pretendard">
            <div className="w-2 h-2 rounded-lg bg-blue-500" />
            완료
          </div>
        )
      case BoxStyle.BADGE:
        return (
          <div className="badge w-[58px] h-[28px] flex shrink-0 justify-center items-center text-blue-500 rounded-[30px]">
            <div className="w-[56px] h-[26px] flex shrink-0 justify-center items-center rounded-[30px] bg-white leading-[1px] font-Pretendard font-semibold">
              NEW
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return <>{selectBox()}</>
}
