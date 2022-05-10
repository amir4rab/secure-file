import { useMemo } from 'react'

import useTranslation, { Values } from './useTranslation'
import formatElements from './formatElements'



interface Props {
  i18nKey: string;
  components?: JSX.Element[];
  ns: string;
  values?: Values
}
export default function Trans({
  i18nKey,
  components,
  ns,
  values
}: Props ): any {
  const { t } = useTranslation(ns)

  const result = useMemo(() => {
    const text = t(i18nKey, values)

    if (!components || components.length === 0) return text

    return formatElements(text, components)
  }, [ i18nKey, components, t, values ]) as string

  return result
}