import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <footer className="bg-gradient w-full h-full text-white p-8 px-20 mt-16">
      <div className="flex gap-24 justify-between">
        <div className="flex flex-col w-[30%]">
          <div className="flex items-center gap-2">
            <img src="icon.svg" alt="Icon" width="40" height="40" />
            <p className={`${outfit.className} font-bold text-2xl`}>OSS67</p>
          </div>
          <p className="text-sm opacity-80 mt-2">
            Website resmi OSS67 untuk menjelajahi, mengikuti, dan
            mendokumentasikan event SMK Bhakti Wiyata & TI Pelita Nusantara.
          </p>

          <ul className="flex items-center gap-4 mt-6">
            <li className="flex items-center gap-2 border border-white/50 rounded-full p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9467 3.44815C11.9 2.50775 11.68 1.67183 10.98 0.98612C10.28 0.300406 9.42668 0.084898 8.46668 0.0391837C7.47334 -0.0130612 4.50667 -0.0130612 3.52 0.0391837C2.56 0.084898 1.71334 0.300406 1.00667 0.98612C0.300008 1.67183 0.0866667 2.50775 0.04 3.44815C-0.0133333 4.42122 -0.0133333 7.32734 0.04 8.3004C0.0866667 9.24081 0.306675 10.0767 1.00667 10.7624C1.71334 11.4482 2.56 11.6637 3.52 11.7094C4.51333 11.7616 7.48001 11.7616 8.46668 11.7094C9.42668 11.6637 10.28 11.4482 10.98 10.7624C11.68 10.0767 11.9 9.24081 11.9467 8.3004C12 7.32734 12 4.42122 11.9467 3.45469V3.44815ZM5.98668 8.97306C4.24001 8.97306 2.82001 7.58204 2.82001 5.87102C2.82001 4.16 4.24001 2.76897 5.98668 2.76897C7.73334 2.76897 9.15334 4.16 9.15334 5.87102C9.15334 7.58204 7.73334 8.97306 5.98668 8.97306ZM9.66667 2.93224C9.3 2.93224 9 2.63836 9 2.27918C9 1.92 9.29334 1.62612 9.66667 1.62612C10.0333 1.62612 10.3333 1.92 10.3333 2.27918C10.3333 2.63836 10.0333 2.93224 9.66667 2.93224ZM8.15334 5.87102C8.15334 7.04 7.18001 7.99346 5.98668 7.99346C4.79334 7.99346 3.82001 7.04 3.82001 5.87102C3.82001 4.70204 4.79334 3.74857 5.98668 3.74857C7.18001 3.74857 8.15334 4.70204 8.15334 5.87102Z"
                  fill="white"
                />
              </svg>
            </li>
            <li className="flex items-center gap-2 border border-white/50 rounded-full p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="16" height="16" fill="url(#pattern0_2032_2147)" />
                <defs>
                  <pattern
                    id="pattern0_2032_2147"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_2032_2147"
                      transform="scale(0.0111111)"
                    />
                  </pattern>
                  <image
                    id="image0_2032_2147"
                    width="90"
                    height="90"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyElEQVR4nO2cS2xNQRiAjwZVLD0S7VJSpAmNlLDARoIQFapSj4rHriW2FSuLLmwlHrWyqIWVlUQkLFBEtBZe8UglgoWUupVUSj+ZOE1urnvnvGam9975v6S7nv/xZe65c87MnSAQBEEQBEEQBEEQBEEQAmAOcBJ4BIxRvYwBD4ETQK1ryQ3AM/xjSPXuciT7KDlftv2RHd4ufKfbhWh1T/adAReic9PdZRmQcyFaAES0I0S0I3wVfVxT71UbCX0VfUxT7ykbCUV0AUCzjYSBbShPjkbUPGg6oYguAtBpOmFgG8qTIxE1zwAemEwooksALANGTCUMbEOFilYAm4BxEwkD21CeHE5Q/zrgc9aEdi1XgWgFsAToBybTJgxsQxWIngJoAfrS3LsD21CedGbsaRawEmgHfsZJaM5o6aLKkUMG+4s1uk3l0xVSUaKBuoT9ieiUoi8AMxP0J6I1HNDU+zx8VVoTsz8RnUG04jowL0Z/IjqjaMUrYGNEf96K/gG8A75p/md/TNFT3AJa1WYgX0VPAo+BHmAVMDcv71mDovP31d0DrgDnwr/xahd9G1ityasT3ZFSdGqsCc4r3DQjwI4YeUV0Bt4Ay2Pm1Ynep7nOe9FvgQUJ8orolDOJpoR5daLbNdd5LfpgirwiOiFPox6Hw8XUNuAG8CW87pcmpoguwpYYqx9JV6z3auJ5KfqTbjQDi4HhFHFFdAEXI2LfTBm3TRPTS9GtmrgbMsQV0QU0a+KezxB3jyaul6IXaeLezxB3tyaul6JrLQnZqYn7EgtYE5xXeBYaNHHvZoi7RhP3IxawJjiv8Cy0aOL2poyZK7XSDcwGJrCAVclh8Vno0MRtAv6kiHnZ9W5/hTXBecVnoT8itlrpSMJX9ZCjiXcGS1iRW1B8Fr6rj7Mmdl2Cx2/1BnB9RK1PsIQVuQXFW92+xT/ZfRG3kQGgMcYGxtS7RaMwLrZIA1kZLrb6XOKe3RvORl6E82y162hzzDrvYBEjMiMaMEGP5Rp3YRmb9U81YYLfwDZL9TVG7AExgo3aCxsxufq9wnBtC4HXOMBk3aWaMckosN1QXeqe/h5HmKg5qiHTTACn43xBlqinRv20IpzuOcO82f8bs8UHNfXTzbOLCN4aHiblnEoWnf9Qc009rgNrgXq1kRyYDyxVb+qASyZ+wua76IpARDtCRFeRaDmODUZdiJYDBnFzwKA6ddZ3ulyIrp2uuWuZMBh3rm/qWOMhTyXXO5FcMLK7w5fw1fwFmQtXfbqcjWRBEARBEARBEARBEISgvPkLYzXBo/B92WAAAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
            </li>
            <li className="flex items-center gap-2 border border-white/50 rounded-full p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3866 4.69534C14.2332 4.13371 13.7799 3.68963 13.2066 3.53942C12.1666 3.26514 7.99992 3.26514 7.99992 3.26514C7.99992 3.26514 3.83325 3.26514 2.79325 3.53942C2.21992 3.68963 1.76659 4.13371 1.61326 4.69534C1.33326 5.71412 1.33325 7.84309 1.33325 7.84309C1.33325 7.84309 1.33326 9.97208 1.61326 10.9909C1.76659 11.5525 2.21992 11.977 2.79325 12.1272C3.83325 12.4015 7.99992 12.4015 7.99992 12.4015C7.99992 12.4015 12.1666 12.4015 13.2066 12.1272C13.7799 11.977 14.2332 11.5525 14.3866 10.9909C14.6666 9.97208 14.6666 7.84309 14.6666 7.84309C14.6666 7.84309 14.6666 5.71412 14.3866 4.69534ZM6.66658 9.79575V5.87738L9.99992 7.83657L6.66658 9.79575Z"
                  fill="white"
                />
              </svg>
            </li>
            <li className="flex items-center gap-2 border border-white/50 rounded-full p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="16" height="16" fill="url(#pattern0_2032_2148)" />
                <defs>
                  <pattern
                    id="pattern0_2032_2148"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#image0_2032_2148"
                      transform="scale(0.0111111)"
                    />
                  </pattern>
                  <image
                    id="image0_2032_2148"
                    width="90"
                    height="90"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADDklEQVR4nO2cO2sVQRiGx0siQSxE8AaCCBYWwcJCLLTQSgtJIVZi663wL/gX/Asp7KwsFAstxKhRLCy0EFQQLARRE0W8PjKwkRPRZPab+Wb3nLwPnPJ8l4fd2dmZZUIQQgghhBBCCCGEEEIIsRTAOHABuAd8QiwQXcwA54GxXMnbgEd/Qov/8RDYmnMlS3I6s6YruxkuRDvOWUTfb5lEwIxF9HzXVQ8hcxbRVm4CW8KQAmwCrlmbtyTM4TVwKAwZwH7gRU7jlqS5/AAuAWtCzwFWAReBb7lNW5KX4hawPfQUYDNwo1SzlgJK8hY4GnoGcBh4U7JRSxGl+QVczn5dLQCwthnWfpZu0lKM5xvULheDaX3tAO54NWcpKIW4qGLhHTDlYnLpnqaa3BaSerUUlULuLTgNTLhYXdzLumbYisOXdciLaz/LYikuOShwJOOh8hjYXVruQG07M5YT4kP8mMVJmwJbBc2cJs0Bpwq5HazpBPDeWNPtv6elKX+yFNk6aIGJ/zSwPtNvrGOiud2Lvmil/NlSrDlo8yr70tjoM2Cvwe9C7j3AE4+lg5QAloKzgmYuznyJd4ah5tPAZ6/FsJQgbWsuEnRgKPlqbP4qsDEhzwbgijHH92aoWF3DiWtQYB/w3CjiFXCgi9ieTtyCUviqq3W3eDrxCxrKjKNdjP9uTlyCNgCTwNOMmUH8WYg5J4ORlAT9CFpurtvJHD0lST+Cln97q/rW6eLEJajPekS1dRQXJy5B/VbYqqwMujhxCZoAcDxjzTjyATgZHBgp0Zm7IA88d29GTnSk5aZClf3IkRTdYqe62g77SIse2FS43vU3IyMv+h+bCp18BbUiRC8AHIy/0AErSnSXSHQlJLoSEl0Jia6ERFdCoish0ZWQ6EpIdCUkuhISXQmJroREV0KiKyHRlZDoSkj0kIvWwSjt+WgRHY9fE+24axEdz3MT7ThrET3enOcm0j9Hs30pFQ/Na04jEMtLth0wOCB7LJ7nFscfPSAXMd84OdOHM0iEEEIIIYQQQgghhBAi9JvfsfD1c2vxksEAAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
            </li>
          </ul>
        </div>
        <div className=" flex flex-col gap-4">
          <h3 className="font-bold">Platform</h3>
          <p className="text-sm text-gray-300">Beranda</p>
          <p className="text-sm text-gray-300">Event</p>
          <p className="text-sm text-gray-300">Galery</p>
        </div>
        <div className=" flex flex-col gap-4">
          <h3 className="font-bold">Sumber</h3>
          <p className="text-sm text-gray-300">About OSS67</p>
          <p className="text-sm text-gray-300">FAQ</p>
          <p className="text-sm text-gray-300">Kontak</p>
        </div>
        <div className=" flex flex-col gap-4">
          <h3 className="font-bold">Support</h3>
          <p className="text-sm text-gray-300">Syarat Layanan</p>
          <p className="text-sm text-gray-300">Kebijakan Privasi</p>
          <p className="text-sm text-gray-300">Kode Etik</p>
        </div>
      </div>
      <div className="border-t border-white/20 mt-8 pt-4 flex justify-between text-sm text-gray-300">
        <p>© 2024 OSS67. All rights reserved.</p>
        <p>Made by Sekbid IPTEK OSS67</p>
      </div>
    </footer>
  );
}
