import { Button } from '@theme-ui/components'
import { useTranslation } from 'next-i18next'
import React from 'react'

export interface AddTriggerProps {
  onClick: () => void
  translationKey: string
}

export function AddTriggerLayout(props: AddTriggerProps) {
  const { t } = useTranslation()
  const caption = t(props.translationKey)
  return (
    <Button variant="primary" onClick={props.onClick}>
      {caption}
    </Button>
  )
}