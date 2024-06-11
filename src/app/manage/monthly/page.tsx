'use client'

import ChangeYear from '@/components/atoms/ChangeYear'
import NavBar from '@/components/atoms/NavBar'
import NoData from '@/components/atoms/NoData'
import Pagination from '@/components/atoms/Pagination'
import ManageCard from '@/components/molecules/ManageCard'
import SelectMonth from '@/components/molecules/SelectMonth'
import { useAccessToken } from '@/components/store/AccessTokenStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ManageMonthly() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [articleList, setArticleList] = useState<MANAGE_ARTICLE_LIST[]>()
  const [articleSummary, setArticleSummary] =
    useState<MANAGE_ARTICLE_MONTHLY_SUMMARY[]>()
  const { accessToken } = useAccessToken()

  useEffect(() => {
    const getMonthlySummary = async () => {
      try {
        let url = `http://api.10aeat.com/manage/articles/monthly/summary`
        const params = []

        if (selectedYear !== new Date().getFullYear()) {
          params.push(`year=${selectedYear}`)
        }
        if (params.length > 0) {
          url += `?${params.join('&')}`
        }

        const summaryResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            AccessToken: accessToken,
          },
        })
        if (!summaryResponse.ok) {
          throw new Error(`HTTP error! status: ${summaryResponse.status}`)
        }
        const monthlySummary = await summaryResponse.json()
        setArticleSummary(monthlySummary.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getManageArticlesMonthly = async () => {
      try {
        let url = `http://api.10aeat.com/manage/articles/monthly/list`
        const params = []

        if (selectedYear !== new Date().getFullYear()) {
          params.push(`year=${selectedYear}`)
        }
        if (selectedMonth !== null) {
          params.push(`month=${selectedMonth}`)
        }
        if (params.length > 0) {
          url += `?${params.join('&')}`
        }

        const manageArticleResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            AccessToken: accessToken,
          },
        })
        if (!manageArticleResponse.ok) {
          throw new Error(`ERROR! status: ${manageArticleResponse.status}`)
        }
        const manageArticlesList = await manageArticleResponse.json()
        setArticleList(manageArticlesList.data)
        console.log(manageArticlesList)
      } catch (error) {
        console.log(error)
      }
    }
    getMonthlySummary()
    getManageArticlesMonthly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth, accessToken])

  const handlePreviousYear = () => {
    setSelectedYear((prevYear) => prevYear - 1)
  }

  const handleNextYear = () => {
    setSelectedYear((prevYear) => prevYear + 1)
  }

  const handleSelectMonth = (month: number) => {
    setSelectedMonth(month)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar isTitle isTextChange={false}>
        법정 시설물 유지관리 점검 현황
      </NavBar>

      <ChangeYear
        selectedYear={selectedYear}
        onPreviousYear={handlePreviousYear}
        onNextYear={handleNextYear}
      />

      <SelectMonth onSelectMonth={handleSelectMonth} data={articleSummary} />

      {articleList && articleList.length > 0 ? (
        <div className="flex flex-col items-center gap-3 min-h-[400px]">
          {articleList.map((item) => (
            <Link href={`${item.id}`} key={item.id}>
              <ManageCard
                id={item.id}
                period={item.period}
                periodCount={item.periodCount}
                title={item.title}
                allSchedule={item.allSchedule}
                completedSchedule={item.completedSchedule}
                issueId={item.issueId}
              />
            </Link>
          ))}
        </div>
      ) : (
        <NoData />
      )}
      {articleList && (
        // <Pagination
        //   totalItems={articleList.length}
        //   itemsPerPage={0}
        //   currentPage={0}
        //   onPageChange={}
        // />
        <div>hi</div>
      )}
    </div>
  )
}
