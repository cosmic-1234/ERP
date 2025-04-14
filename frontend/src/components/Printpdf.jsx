import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// 💅 Styles for a clean, modern invoice
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#1F2937', // Tailwind gray-800
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#374151', // Tailwind gray-700
  },
  label: {
    fontSize: 10,
    color: '#6B7280', // Tailwind gray-500
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Tailwind border-gray-300
    borderBottomStyle: 'solid',
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  tableCol: {
    width: '33%',
  },
  tableColRight: {
    width: '33%',
    textAlign: 'right',
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderTopStyle: 'solid',
    textAlign: 'right',
  },
  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
});

const InvoicePDF = ({ invoice, totalamount }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Invoice Title */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBDgMBEQACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcBAgMEBQj/xABHEAABAwICBAoGCAQDCQAAAAABAAIDBBEFBhIhMUEHExVRYXGBkbHRFBYiQlKhI1NVYnJ0ksEyMzaTJOHxFzVjc4KDstLi/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAUGAQMEAgf/xAAyEQACAgECBAIKAgIDAQAAAAAAAQIDEQQFEhMhMUFRFBUiMjNSYXGRsUKhNIEj4fBi/9oADAMBAAIRAxEAPwDW6uR83F0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0AugF0BpdD2LoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoBdALoDS6GRdALoDN0M4F0GBdBhi6GMC6AXQGLoBdAZugwLplDAumUMC6ZQF0Bi6AzdALplAXTKGBdMoYF0yhgXTIwYuhnGBdDAugF0AugF0AugF0AugM3TICZRnBpcLBnA3XQYOxR0dVXS8XR08k7+ZjSbdZ3LxZZGpZm8G2qiy2WILJJKDIWKzi9TJDTN+FztNw7Bq+a4LN0qj7qbJSrZb5dZtL+z1I+DqO302JPP4IQ39yueW7Pwh/Z1R2KP8p/0bP4OYNH6PEZQ7ndGCPELC3aXjD+zMtihjpP8Ao6VTwd1zWn0Wup5Hf8RhZ4XW6O6wfvRf5NM9jmvdmn/R4tflXG6IFz6F0jB70J0/kNfyXTDXUT/l+Tgt2zU1/wAPweK5rmOLXtLXDaCLLrTTWUcLi08NGLrJjAuEGDaJjpZGRxi73uDAOk7FiUuFZZ6jFyaRJPUbHPq4P7oXD6yo83+CT9Tar6fkeo2OfVwf3QnrKjzf4HqbVfT8j1Gxz6uD+6E9ZUeb/Bn1Nqvp+TwcRo6jDqySkq26M0dtIA3GsX8Cuuu2NsFOPZkfdTOmbhPude4Ww04F0CR7OEZaxPF6Y1NE2IxBxZ7Uljcf6rlt1lVMuGTO/T7ffqIcUOx3fUbHPq4P7oWr1lR5v8G71Nqvp+R6jY59XB/dCesqPN/geptV9PyPUXHPq4P7oT1lR5v8D1Nqvp+TV2R8daLiCJx+7MP3WVuOnfj/AEYez6peC/J1Z8qY9C3Sfh0hH3Htee4Fe467TvtI1S2zVxWXD9Hl1FJU0rtGqp5YXc0jC3xXRGyE/daZyWUWV+/Fo4d9t69mvDF0GBcIMC4QYFwgwLhBgXCDABH+qDBJstZRqMZgdU1D3U9Nb6M6N3PPPr3KP1WvVL4YrLJbRbXK9cc+iIsNu1d5F4JTlLKj8XIq6y8dHfUBqdJ1dCjtZrVV7MO5L6DbXd7dnSP7LLoaKChgbBSwsijG5o29fOoOc5TeZMstVUKo8MFhHZAXg2GUAQBAauBOxAediuE4fXxuOIU8brN1yHUQOtba7rK37DNF1FVsf+SOSm6/0cVkwoi404cRGXG5srTW5OCc+5S71BWNQ7HBdezUSbg/w/03HmTPF4qVnGHV72xo8T2KP3G3gq4V4kptNHMv4vCPUthV4tgQGDsQFecJ2HlstLiLBqcOKlPSNbT4/JTW129HWyvb1R1jcvsQS6lyAwZB1oEWjwZ/7gk/MO8Gqv7n8ZfYtez/AON/tktUcSoQBAEBqQbrANJYY5mFksbXsO1rhcL1GTj1R5lFSWGiK47kekrGPkw8Cmn2hvuE9W5SGn3GyvpLqiL1W1VWrir9l/0VvXUlRQVUlNVRmOWM2IPiOhTldkbIqUfErNtM6puEl1RwXWw1i6AXQC6AX3m3agwS3JuVX4m5tbXNtRNN2MI/m/5KM1ut5eYQ7/omdu27mNWWLoWdGwRtDWtDWgWAGwBQTbfVlmSS6IpTLuGnF8Yp6Q3DHHSkP3RrKtGpu5NTkU3R0c66MPAumKFsMbI42hrGABrRqAAVXbbeWXGMVFYRyrB6MX6EBwy1lND/ADp44/xuAWVGT7I8ynGPdiKrppf5U8b/AMLgVlwku6MKyD7M5dILyexpDmKZQIZwjY6KSkbhlO4ieobeUj3Y77O0/upPbdPxz5kl0RD7rquXDlR7v9FZk61PZyVpoXQxgtbg9w70PAmzuFpKs8YT93YPPtVd3G3mXY8F0LZtVHKoz4vqSsbFwEkEAQHkZnw3lPBKqmAGmWaTCdzhrC36azl2xkcusp51MoFLG4uCLWNjfarSUxxwzAKyYLT4MTfL8n5l3g1V/c/jL7Fp2f8Ax/8AbJco4lQgMXQC6AaQRdewMjWgCAiefsFbX4S+sjaPSaUaYIGtzN4/dd+338u3gb6S/ojNz0qtq4l3RVV+dWIqmBdALoBdAS3JuU34q9tZXtLaFpu1h1Gb/JRms1vK9iHf9Evt+3c1qyxdP2WjHGI2hrQGtAsABYAKBbb6ssyWOiN0MlbcFdOH1ddUnWWMDBfdc3/ZTW6z9mMSA2WtZlMslQpPmDsQEZz7iVZhmBh9CSx0kojfIPcaQdffYdq7NBVCy3Ejg3G6yqnMCpZZHSyGSVznvO1zjcnrKsccR6Iqk228tmgsNdrHoWTzk9GixzE6F4dTV9Q23ul5c3uK0z09NnvROivV31+7JkrwnhElaNDFKYSav5kOo9oUddta7wZKU7z4Woh+K18uJYhNWzn25XaVuYbh2BSdNaqgoxIm+53WubOoSthoO3hNG7EcRp6Ro/mvDbj5rXbYq4Sk/I36ep22Rgi86eFsMMcUYs1jQ0DoCqjfE8susVwrCOVYMmulr2LGQbLIMHYgKYzlh/JuP1EbRaOQ8azqKs2it5lMW/AqO408q+X16niA611nAWnwX/09J+Zd4NVf3P4y+xaNo/x39yYKOJUICv8AhPqqmmqKIU9RNDpMdfi5C2+voUvtkISjLiSZB7vOcHHhbRCW4xiTHAtxCrFjq+ncf3Uo6Kn04V+CGWqvTypv8khwHPNfS1MceKSek0rtTnkWezXt6Vw6nbq5RzX0ZI6XdLVJKzqi043B8bXtIc1wuCN4UFjHQsmc9UbIDVzA8EOALSLEEbUMdyha+n9DrqmkuTxEz4wTvAcQCrbXLjgpeZSLYcE3HyOvdezVgLJnBLsl5Ufi0ja2uaW0IN2NOozHyUZrdZyvYh3/AES237e7f+SxdP2WnFG2JrWMaGtaLAAagFAttvLLKlhYRuhkICt+CmoAqK6nJ1ua146bav3UzusekWQOzTWZQLIUMTwKA4Kqlhq4HwVLGyQvFnMcNRCzGUovii+p4nCM1wy6or/G+Dt7XOkwWe7d1PM7WOp2/t71L07p4Wr/AGQuo2jrmp/6IbiGE4hhry2tpJYrby32T1HYpOF9VizGRE26W2r34nSuNxutmTRwi+rVtWQYugF0ME54LsO46uqMQe32YG6DPxHb8vFRO6W4ioeZN7PTmTs8uhZw2KFLAEBHMRx30XNuH4UHARyxu40fed/B/wCJ71116fi087f/AH1OKzU8OphV55/6JGuQ7TB2FAQThRw4y0FPiLB7UDuLk/C7Z8/FSm124m634kPu9PFWrPIrW9j0qcK7gtXgt/p2T8y7waq/ufxl9izbR8B/cmKjyUCArfhYNqig/A7xCmdr92RBbz/EgJKl33IHABTxM4L2y9pch0Gnt4hngqpdjmSwXWj4Uc+R6C1G0ICj82jRzLiQGoce49qs+k+BH7IqGu/yZ/c8ldJyEtyZlN+LytrK8OZQtN2tOozHyUbrdYqvYh3/AESug2924nZ2/Za0UTYmtZG0Na0WDQLABQLbbyyyJYWEboZCAICi8tYscHxinrLHi2nRlA3sO3uVn1NPOq4SoaS/kWqRd1PUR1EMc0DmvikAc1zTcEHYVWWmm0+5botSWV2OZYMgoDGj0oDWSJkrSyRoew7WuFwUXTsYaT7kcxjJOD4iCWRGllPvw6vlsXZTrrqvHKOK7bqLfDDIDj+TMTwkOmY30qmbrMkY1tHS1S2n19Vzx2ZC6jbbaeq6ojN13EdgXFr821DKRduTML5My7SRPbozSN42UHbpO12PULDsVY1dvMuk/Atuip5VEYnurmOsxfXuQFI4/i7p80T4lG4/RzjiyOZmoeCs1FPDp4wZVNTe5ap2LwZc9FUtrKSGojtoSsDx2hVuUXGTi/AtMJKUVJeJ2F5PR0sYoGYnhdVRSfwzxll+Y7j2GxXuqbrmpLwNd1atg4PxKHmY+KV8crdGSNxY8cxGo/NWyMlLEl4lNnBwbi/AtPgs/pyT8y/waoDc/jL7Fj2n4D+5MlHkmEBWvC24Cpw8Egew7f0qZ2pdJEFvHeKIA06ZAYdJx1AN13Us34sheBt4RKMs5Pr8TqWPrIJKaiabvdK0tL+gA6+1cGq11dccR6skdJt9tkszWEi342tYxrGABrRYAbgq/wBfEsy+hsgMXQFBYtViuxSrqWuu2ad72k/CXEj5K2VQ4K4x+hTL58dkpebJFkrKb8YlZW17SygafZbvmPkuLW6xVLhj3/R36DQO18yfb9lsxRMiY1kbQ1jRZrQLABQDbbyyxpYWEboZCAIAgPnO91cCkIlGUc4T4FI2mqA6egJ1s96M7y3y7ra78Gr0Ub+sfe/f3JHRa6VHsy6x/RaeFYzQ4vCJaCoZIN7djm9Y2hQVtNlTxNYLBVfXasweTvg3WrJuNlkBAYIugBaCgK+z7k6N0UmK4TFoyN9qeBux43uaNx5xv69stotc01XY+ngQ2v29STtr7+JDcpYZytj9LSubpQ6XGSj7g12PXqHapHV28qpyXcjNFSrb4x8upebdirBbDKA8fNNeMMwCtqSbODC1n4jqC3aavmWqJo1NnLqlIowuubnXrurTgqDeS3ODTEPTMvtgcfbpXmPs2hV/ca+C7K8SzbbZx0JeXQl64CQMO2IzDKf4RsN9AzE+dgtFVt4wfi2O/Y9qsO3W8dWPIre6U8F3F5ku4Kv6bk/Mv8GqO3P4y+xJ7V8B/cmajySCA1fG19tIA25wsptAw2JjdjR3LBjCNtEFDIAsLIDKAjGfMbbhOCyxxvtV1LTHEBtF9ruwfNdehodtib7I4dfqFTU/NkIyVlF+MyNrK4OZQNdqG+a27qUprNYqlww7/oitBoHb7c+37LbiiZDG2OJoaxoAa0DUAoBtt5ZYkklhG6GQgCAIAgPnC6t5SsDSQHJTVM1LKJaaaSKQbHMNivMoqSw1k9wnKLyngl2EcImK0gDKxkdZGN51P7wuC3bapP2Hgkad0sgsTWSXYbwhYLWWbUPfRyH61t236wo+zb7odV1JKvcaZ9H0ZKYKiKoibLBKySNw9l7CHNPUQuFpro0dqkn1TOUIejKA1cL6iLgjYgIvlfLjcIxjFakMDWSyWgHMzafmfkuzU6nm1wj5HFptNyrJy8yUgWFlxnajKAr3harzFR0dFchsshe47rDZ8ypTa4Jzc/Iid1m+BQXiVnfp7VN9SAwiacFVeYsbmpL3ZURX1a9FzTq8T3KM3OGa1LPVEttU5RsccdGW0oMnzB1hAQ/hMw30zADUsF5KR2mD93YV37dby7cPxI/cquZS35GnBR/TUn5l/g1Z3P4y+x52v4H+yaKPJIIAgCAIDUkrDB4WY81YfgMZbNKJaq1208Zu49fMOtdWn0tlz6dvM5dRq66F17+RDMEweuzpiZxjGbihB9ho1aYHut6OcqRuuhpIcqruRtNE9ZZzbe3kWdFDHDG2OJoYxgs1rdQAUK228sm0klhHIhkIAgCAIAgPm66t5S8GzWuc17mscWtF3ED+HrRtHpRb8DW9kMYRi6AyDbYgPRwPHa7A6oTUMzmtveSIn2ZBvuOfpWi/TwuWGup0Uaiyl5i+hfNDOKmlinDS0SMDgDtFwqxKPDJotMHxRTOdYPQ2oDFggMoAgNXMa8Wc0EcxWU2uxhpPudI4JhJk4w4XQ8Z8Xo7L99ls59vzP8s18irOeFfhHcihihboxRtY0bmiwWttvubFFLsjdYMhAcNVBHU00kEouyRpa4dBWVJxaaMSipJpka4O6N9BhldSSCzoa6RhHY1dmusVlin5pHHoYcutx8myVriO0ICL5wzactTUzPQ/SBM0m/GaNrdhXbpdH6Qm84OPVav0fHTJHf8AaobasHv11H/yur1V/wDX9HE938of3/0cNRwpVbmHiMLhjduc+YvHcAF7jtUf5Sf4PMt2k17MTwMTztj2ItLX1vo8bhYspm6Hz/i+a6a9DTB9s/c5bdffPpnCO5krKUmOS+m14c2ha7tmO+3Rzla9Zq1SuCHf9GzRaN3PmT7fst+GGKGJkUUbWRsADWtFgAoFtt5ZYEklhHIsGQgCAIAgCAID5qureU3BcPBzgDKLAjUVcTTPXe29r27Ge6D8z2qv6+/jt4YvoixaGhQqzJdWaY3wd4ZXOdLQPdRTHcwaTD/07uxZp3GyvpPqhft1VnWPRkSq+DnHoHO4n0WpZ7pZLok9jgPFd8NzoffoR09ruXu9TqsyFmRx9qgazX707P2K9+sdP8x5W26jyPdwLg1qvSWS41NCIWm/EQkuL+gkgWXNduceHFa6nTRtbTzYyzo2tYwNaLAAAAcyhs5JrGDdAEAQBAEAQBAEAQBAYOxAcUEEcMkz4xZ0zw9/SbAeACy3nH0MKKXY5lgyEBWHDDqqsO/5bvEKY2vtIh917xK6J1qX8SFMX6UMkvyPlF+OSemVrXMw9p1bjMeYdHSuDWaxVLgj3/RJaPRO18c+xcUEMUELIoY2sjY3Ra1osAFX23J5ZPKKSwjkQyEAQBAEAQBAEBQ2S8FOO47DA9v0Ef0k2rVojd2lWXV38mpvx8CtaOjm2ryL2a1rWta0WaBYBVosptYcyAygCAxYcyAygCAIAgCAiueM1nLcdLxMTJ5pnm8bnaNmDbr3ayPmuvR6X0iTy8I5NXqvR0ml1PHpeFOhcAKrD6mM7ywhw810S2uf8WjnW51+KZ3xwlYARrdUj/tFa/Vt/wBDb6xo8zr1PCfhDB/h6arnJ5gG+JXqO2WvuzxLc6V2ydnJ2dTmPE6ilfStpw2PTi+k0i7Xr3dK8arR8iClnJ702s583HGCZLhO4IAgCAICruGM/wCKw78DvEKY2v3ZEPuneJXLjrKlm+rIdEuyPlGTHZhV1oczDWnfqMx5h0dK4dZrFUuGPvfokNHoua+KXYuSnhjggZFDG1kbBota0agFANuTyyfSUVhHLsWDIQBAEAQBAEAQBAfPWAZhxDAaoy0EjQH2043i7Xjp/wAlaL9PC9YmVmi+dLzEsrBeEvCaxrY8SY+hm3usXxk9Y1jtHaoe7bbY9YdUS1W4VS6T6Ewoa+kr4hLRVcNRH8UUgcPkuGdcoPEk0d0ZxksxeTtryeggMFAedimN4ZhLNPEa6Cn1X0Xv9o9Tdp7FshVZY8QWTxO2EF7TwQDMnCbxkb4MvxOa46hUztt+lvn3KSo21r2rfwRt24rtX+ST0WcsuU9JDC7GI3ujYGuc5rySQOpcktHqHJvgOqGqpUUuI5/XfLf2tF+l/kvPoeo+U9el0fMh675a+1odW7Rd5J6FqPlHpdHzFUZ4xpmOY/NUQv06aMCOAje0b9fPrU3o6XVVh9yF1l3MtyuyI/fmXWceBdYAvbWgPayfijMHzFSVcztCJri2V1r2YdS59VVzKXFdzr0lvLtUn2Ld9d8t/a0P6XeSgvQtR8pN+mUfMPXfLf2tF+l/knoeo+Uel0fMh675b+1ov0v8k9D1Hyj0uj5kPXfLf2tF+l/knoeo+Uel0fMh675b+1ov0P8AJPQ9R8o9Lo+ZEA4Tsaw7GJ6F+GVTKhsbHB+iDq19IUnt9VlaamsEbr7YWOPC8nVyNlCTH5xV1jTHhrDrOwynmHRzlbNZrI0x4Y9zxo9G7cSl2LnpoY6eBkMMbWRsGi1rRqACgG3J5ZOpJLCOVYMhAEAQBAEAQBAEAQHzFdW4qQuhnBtFK6KXjY3OjePfabEdqNZWGZTa7Hp02ZccphaHF6wDcHTF1v1XWiWmpl3ivwbo6m6PaTO166Zk0bcsT/pZ/wCq8+h0fKe/TL/mOnU5ixmrBFRitY5p2gTOaD2Cy9x09Me0UeHqLn3keYSLk7ztO8rcjS8sXQ8i6AXQyLoYF0AuhkXQC6AXQwLoBdDIugF0MDahkl+Rcny5gmbV1gdHhrDrOwynmHR0rh1msVK4Y9zv0mjdr4pdi6aWCKmgZBBG2OKMaLWNFgAoBtt5ZOJJLCOVYMhAEAQBAEAQBAEAQBAfMF1biqC6AXQC6AXQC6AXQC6AXQC6AXQC6AXQC6AXQC6AXQC6AXQC90BLch5PmzDOKqra6PDYne07fMR7o6OlcOr1ipXDH3v0d+l0nMfFLsXZSwRUsDIII2xxMFmsaLABQDk5PLJtJJYRzLBkIAgCAIAgCAIAgCAIAgPl25VuKtgXKDAuUGBcoMC5QYFygwLlBgXKDAuUGBcoMC5QYFygwLlBgXKDAuUGBcoMC5QYFygwLrDYJfkTJs2YZxU1YdHhsbvadsMp5h0dK4tXq1SuGPvHdpdK7Pal2LtpKeKlgZBTxtjijaGsY0WDRzKAcnJ5ZNJJLCOZYMhAEAQBAEAQBAEAQBAEAQHzfybD8cnePJWnjZXeWhybD8cnePJONjlocmw/HJ3jyTjY5aHJsPxyd48k42OWhybD8cnePJONjlocmw/HJ3jyTjY5aHJsPxyd48k42OWhybD8cnePJONjlocmw/HJ3jyTjY5aHJsPxyd48k42OWhybD8cnePJONjlocmw/HJ3jyTjY5aHJsPxyd48k42OWhybD8cnePJONjlocmw/HJ3jyTjY5aHJsPxyd48k42OWhybD8cnePJONjlocmw/HJ3jyTjY5aPRy9gNJX41SUtQ+YxSSAPDXAXHNsWu66UIOUe5sqqi5pMvikp4aWBsFNG2OKMaLWNFgAq2228vxJ1RUVhHOsGQgCAIAgCAIAgCAIAgCAIAgP//Z"
        />
        <Text style={styles.headerTitle}>Invoice</Text>
      </View>

      {/* Invoice Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invoice Details</Text>
        <Text style={styles.label}>Invoice Number:</Text>
        <Text style={styles.text}>{invoice.invoice.billingno}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.text}>{invoice.invoice.billingdate}</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill To</Text>
        <Text style={styles.label}>Customer No:</Text>
        <Text style={styles.text}>{invoice.customer.customerno}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.text}>{invoice.customer.address}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol}>Item</Text>
          <Text style={styles.tableColRight}>Quantity x Price</Text>
          <Text style={styles.tableColRight}>Amount</Text>
        </View>
        {invoice.invoiceitems.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{item.materialid}</Text>
            <Text style={styles.tableColRight}>
              {item.quantity} x {item.unitprice}
            </Text>
            <Text style={styles.tableColRight}>
              ${item.quantity * item.unitprice}
            </Text>
          </View>
        ))}
      </View>

      {/* Total Amount */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${totalamount}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;