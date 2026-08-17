import amazonPaapi from 'amazon-paapi';

interface AmazonItemInfo {
  title: string;
  imageUrl?: string;
  price?: string;
  url: string;
}

// Amazon URLからASINコードを抽出する関数
export function extractAsin(url: string): string | null {
  const match = url.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
  return match ? match[1] : null;
}

// PA-APIを呼び出して商品情報を取得する関数
export async function getAmazonItemInfo(asin: string): Promise<AmazonItemInfo | null> {
  const commonParameters = {
    AccessKey: import.meta.env.AMAZON_PAAPI_ACCESS_KEY,
    SecretKey: import.meta.env.AMAZON_PAAPI_SECRET_KEY,
    PartnerTag: import.meta.env.PUBLIC_AMAZON_ASSOCIATE_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp',
  };

  const requestParameters = {
    ItemIds: [asin],
    Resources: [
      'Images.Primary.Medium',
      'ItemInfo.Title',
      'Offers.Listings.Price',
    ],
  };

  try {
    const data = await amazonPaapi.GetItems(commonParameters, requestParameters);
    const item = data.ItemsResult?.Items?.[0];

    if (!item) return null;

    return {
      title: item.ItemInfo?.Title?.DisplayValue || 'Amazon商品',
      imageUrl: item.Images?.Primary?.Medium?.URL,
      price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount,
      url: item.DetailPageURL,
    };
  } catch (error) {
    console.error(`PA-API Error [ASIN: ${asin}]:`, error);
    return null;
  }
}