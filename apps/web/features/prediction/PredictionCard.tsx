import { Card, CardContent } from '@workspace/ui/components/card'
import { Prediction } from './Prediction'
export type PredictionCardProps = {
  predictionText: string
  author: string
  date: Date
}

export const PredictionCard = ({
  predictionText,
  author,
  date,
}: PredictionCardProps) => {
  return (
    <Card>
      <CardContent>
        <Prediction text={predictionText} author={author} date={date} />
      </CardContent>
    </Card>
  )
}
