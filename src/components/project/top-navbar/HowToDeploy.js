import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function HowToDeploy() {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="how-to-deploy-link" onClick={() => setIsOpen(!isOpen)}>
        How to deploy website?
      </div>

      {isOpen && (
        <>
          <div className="how-to-deploy-step">
            1. Sign up with email to Netlfiy
          </div>
          <div className="how-to-deploy-step">2. Confirm email</div>
          <div className="how-to-deploy-step">
            3. Fill Netlify "Get started" form (only first field is required)
          </div>
          <div className="how-to-deploy-step">
            4. Click "Download code" in FigFlow
          </div>
          <div className="how-to-deploy-step">
            5. Drop zip file in "Deploy manually" box in Netlify
          </div>
          <div className="how-to-deploy-step">
            6. Click "Domain settings->Options->Edit site name" in Netlify
          </div>
          <div className="how-to-deploy-step">
            7. Paste same name of the project you use in FigFlow to Netlify
          </div>
          <div className="how-to-deploy-step">
            8. Next time you want to update site you can click "Open Netlify
            Deployment"
          </div>
        </>
      )}
    </div>
  )
}
