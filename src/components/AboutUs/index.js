import { isMobile } from 'react-device-detect'
import './AboutUs.scss'
export const AboutUs = () => {

    return(

        <article className="about-us">

    <div className="about-us__container">

{isMobile ?   
                    <>
                    <h2 className="about-us-title">Title</h2>
                    <img src="https://firebasestorage.googleapis.com/v0/b/bitwallet-56e26.appspot.com/o/about-us-img.png?alt=media&token=dd344eb4-a06d-4d4b-b765-4fb58e1f9de4" alt="" className="about-us-img" />

                    <p className="about-us-description">Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. The official distributor makes it possible to organize a full cycle of work with cryptocurrencies. Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. offers products of popular world brands. The official distributor makes it possible to organize a full cycle of work with cryptocurrencies.</p>

                    <p>The official distributor makes it possible to organize a full cycle of work with cryptocurrencies. Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. offers products of popular world brands.</p>
                    </>

    :
    <>
    <img src="https://firebasestorage.googleapis.com/v0/b/bitwallet-56e26.appspot.com/o/about-us-img.png?alt=media&token=dd344eb4-a06d-4d4b-b765-4fb58e1f9de4" alt="" className="about-us-img" />
    <h2 className="about-us-title">Title</h2>

    <p className="about-us-description">Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. The official distributor makes it possible to organize a full cycle of work with cryptocurrencies. Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. offers products of popular world brands. The official distributor makes it possible to organize a full cycle of work with cryptocurrencies.</p>

    <p>The official distributor makes it possible to organize a full cycle of work with cryptocurrencies. Bitwallet is an online store of crypto wallets and accessories in Ukraine, which offers products from popular world brands. offers products of popular world brands.</p>
    </>

     }
        
    </div>

</article>

    )


}