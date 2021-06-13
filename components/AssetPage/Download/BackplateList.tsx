import filesize from 'filesize'
import Masonry from 'react-masonry-css'

import { MdHelp, MdVisibility, MdFileDownload } from 'react-icons/md'

import styles from './DownloadOptions.module.scss'

const BackplateList = ({ assetID, files, setPreview }) => {
  const types = {
    jpg_pretty: { name: "Pretty JPG", tip: "With some visual improvements (as shown)." },
    jpg_plain: { name: "Plain JPG", tip: "No adjustments, converted straight from RAW." },
    raw: { name: "Original RAW", tip: "Straight from the camera." },
  }

  const preview = (e) => {
    setPreview(e.currentTarget.dataset.src)
  }

  return (
    <>
      <h3>Backplates: <MdHelp data-tip="The images below are separate photos that you can use as high resolution background images in your render.<br />Depending on your render resolution and camera settings, sometimes an HDRI (even a very large one) might not have enough pixels to still appear sharp in the background of your render. In these cases you can use one of these backplates in the background instead, and use a lower resolution HDRI just for lighting and reflections." /></h3>
      <Masonry breakpointCols={2} className={styles.masonry} columnClassName={styles.masonryColumn}>
        {Object.keys(files).sort().map((n, i) => {
          const bp = files[n]
          return <div key={i} className={styles.thumbnail}>
            <img src={`https://cdn.polyhaven.com/asset_img/backplates/${assetID}/${n}.jpg?width=144`} />
            <div className={styles.buttonWrapper}>
              <div
                className={styles.button}
                data-src={`https://cdn.polyhaven.com/asset_img/backplates/${assetID}/${n}.jpg`}
                onClick={preview}
              ><MdVisibility /></div>
              <div className={styles.button}>
                <MdFileDownload />
                <div className={styles.downloadMenu}>
                  {Object.keys(types).map((t, j) =>
                    <a
                      key={j}
                      className={styles.download}
                      href={bp[t].url}
                      target="_blank"
                      data-tip={types[t].tip + `<br/>(${filesize(bp[t].size)})`}
                    >
                      {types[t].name}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        })}
      </Masonry>
    </>
  )
}

export default BackplateList