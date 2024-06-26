'use client'

// import axios from 'axios'
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/atoms/Dropdown'
import TextArea from '@/components/atoms/TextArea'
import TextEditor from '@/components/atoms/TextEditor'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import DatePicker1 from '@/components/atoms/DatePicker'
import DangerIcon from '@/components/icons/danger.svg'
import CloseIcon from '@/components/icons/close.svg'
import CalendarSelect from '@/components/atoms/CalendarSelect'
import { useAccessToken } from '@/components/store/AccessTokenStore'
import AdminLogo from '../../_components/atoms/AdminLogo'
import SideMenu from '../../_components/atoms/Sidemenu'

export default function RepairUpload() {
  const [category, setCategory] = useState('')
  const [progress, setProgress] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [repairCompany, setRepairCompany] = useState('')
  const [repairCompanyWebsite, setRepairCompanyWebsite] = useState('')
  const [constructionStart, setConstructionStart] = useState(null)
  const [constructionEnd, setConstructionEnd] = useState(null)
  const [images, setImages] = useState<string[]>([])
  const [showWarning, setShowWarning] = useState(false)
  const [posts, setPosts] = useState<POST[]>([])
  const router = useRouter()
  const { accessToken } = useAccessToken()

  // const handleTitleChange = (value: string) => setTitle(value)
  // const handleContentChange = (value: string) => setContent(value)
  // const handleRepairCompanyChange = (value: string) => setRepairCompany(value)
  // const handleRepairCompanyWebsiteChange = (value: string) =>
  //   setRepairCompanyWebsite(value)
  // const handleConstructionStartChange = (date: any) =>
  //   setConstructionStart(date)
  // const handleConstructionEndChange = (date: any) => setConstructionEnd(date)
  // const handleImagesChange = (value: string[]) => setImages(value)

  useEffect(() => {
    const getPostData = async () => {
      try {
        const response = await fetch(
          `https://api.10aeat.com/repair/articles/list?progress=PENDING&page=0&size=5`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              AccessToken: accessToken,
            },
          },
        )
        const data = await response.json()
        setPosts(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    getPostData()
  }, [accessToken])

  console.log(posts)

  const handleSubmit = async () => {
    if (
      !category ||
      !progress ||
      !title ||
      !content ||
      !repairCompany ||
      !repairCompanyWebsite
    ) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 2000)
      return
    }
    router.push('/admin/repair/list')

    const postData = {
      category: 'REPAIR',
      progress: 'PENDING',
      title,
      content,
      constructionStart: [2024, 6, 3, 15, 4, 4, 538122438],
      constructionEnd: [2024, 6, 8, 15, 4, 4, 538131825],
      repairCompany,
      repairCompanyWebsite,
      images,
    }

    // try {
    //   const response = await axios.post('https://api.10aeat.com/managers/repair/articles', postData, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   console.log(response.status);

    //   if (response.status === 200) {
    //     console.log('Post created successfully:', response.data);
    //   }
    // } catch (error) {
    //   console.error('Error creating post:', error);
    // }
  }

  // const addBuilding = async () => {
  //   // buildingInfoId중 가장 높은 값 검색
  //   const maxBuildingInfoId = buildings.reduce(
  //     (maxId, building) => Math.max(maxId, building.buildingInfoId),
  //     0,
  //   )
  //   // 새로운 building 정보
  //   const newBuilding = {
  //     buildingInfoId: maxBuildingInfoId + 1,
  //     officeName: '미왕 빌딩',
  //     dong,
  //     ho,
  //   }

  //   try {
  //     const response = await fetch(`https://api.10aeat.com/my/building/units`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         AccessToken: accessToken,
  //       },
  //       body: JSON.stringify({ dong, ho }),
  //     })

  //     if (response.ok) {
  //       setBuildings([...buildings, newBuilding])
  //       setDong('')
  //       setHo('')
  //       console.log(buildings)
  //     } else {
  //       console.error('Failed to add building')
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <div className="relative w-full bg-white">
      <AdminLogo />
      <div className="flex">
        <SideMenu menuIndex={1} />
        <div className="w-[1024px] mx-[24px] bg-white font-Pretendard">
          <div className="flex items-center py-[24px] my-[16px] border-b border-gray-300">
            <button
              type="button"
              onClick={() => router.push('/admin/repair/list')}
            >
              <Image
                src="/icons/arrow_left_large.svg"
                width={24}
                height={24}
                alt="arrow_left_large"
              />
            </button>
            <div className="text-[20px] font-bold leading-[28px] text-gray-900 capitalize pl-[4px]">
              건물 유지보수 사안 등록
            </div>
            <div className="text-[14px] font-normal leading-[20px] text-blue-600 capitalize pl-[20px]">
              *필수입력
            </div>
          </div>
          <div className="flex items-center gap-[52px]">
            <div className="flex items-center py-[8px]">
              <div className="flex w-[124px] ml-[16px] text-[16px] leading-[24px] font-semibold capitalize">
                <div className="text-gray-900">유지보수 구분&nbsp;</div>
                <div className="text-blue-600">*</div>
              </div>
              <div className="flex gap-[12px]">
                <Dropdown
                  isDisabled={false}
                  size="md"
                  placeholder="사안 유형"
                  options={['설치', '보수', '교체']}
                  onChange={setCategory}
                />
                <Dropdown
                  isDisabled={false}
                  size="md"
                  placeholder="진행 상태"
                  options={['진행중', '대기', '완료']}
                  onChange={setProgress}
                />
              </div>
            </div>
            <CalendarSelect />
            {/* <DatePicker1 isDisabled={false} /> */}
          </div>
          <div className="flex items-center py-[8px]">
            <div className="flex w-[124px] ml-[16px] text-[16px] leading-[24px] font-semibold capitalize">
              <div className="text-gray-900">안건 제목&nbsp;</div>
              <div className="text-blue-600">*</div>
            </div>
            <div>
              <TextArea
                placeholder="제목을 입력해주세요."
                width="840px"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center py-[8px]">
            <div className="flex w-[124px] ml-[16px] text-[16px] leading-[24px] font-semibold capitalize">
              <div className="text-gray-900">안건 내용&nbsp;</div>
              <div className="text-blue-600">*</div>
            </div>
            <div>
              <TextEditor
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={setContent}
              />
            </div>
          </div>
          <div className="flex w-[600px] items-start py-[32px]">
            <div className="w-[124px] ml-[16px] text-[16px] leading-[24px] font-semibold capitalize">
              <div className="text-gray-900">담당 업체&nbsp;</div>
            </div>
            <div className="flex flex-col gap-[16px] text-[14px] font-medium leading-[14px]">
              <TextArea
                placeholder="업체명을 작성해주세요."
                width="178px"
                text="14px"
                value={repairCompany}
                onChange={(e) => setRepairCompany(e.target.value)}
              />
              <TextArea
                placeholder="해당 업체의 웹사이트 링크를 첨부해주세요."
                width="292px"
                text="14px"
                value={repairCompanyWebsite}
                onChange={(e) => setRepairCompanyWebsite(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-[1024px] justify-end p-[24px]">
            <button
              className="flex p-[14px] rounded-[12px] bg-blue-600 text-[20px] font-semibold leading-[20px] text-white"
              type="submit"
              onClick={handleSubmit}
            >
              등록하기
            </button>
          </div>
          {showWarning && (
            <div className="flex fixed top-[36px] left-1/2 transform -translate-x-1/2 py-[12px] px-[16px] gap-[16px] justify-between rounded-[8px] bg-[#C05621] text-18px leadeing-[24px] text-white">
              <DangerIcon fill="#FFF" />
              <div className="flex w-[229px] flex-col gap-[8px]">
                <div className="font-semibold">게시글 등록</div>
                <div>필수 항목을 전부 입력해 주세요.</div>
              </div>
              <CloseIcon width="24" height="24" fill="#FFF" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
