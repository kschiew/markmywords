import {
  Blockquote,
  BlockquoteAuthor,
} from '@workspace/ui/components/blockquote'

export type PredictionProps = {
  text: string
  author: string
  date: Date
}

export const Prediction = ({ text, author, date }: PredictionProps) => {
  return (
    <Blockquote>
      {text}
      <BlockquoteAuthor className="text-sm">
        {author + ', ' + date.toLocaleDateString()}
      </BlockquoteAuthor>
    </Blockquote>
  )
}
