/*
	!- Data structure :
		- Kafka consumer output = {
			symbol : 'AAPL'
			quote : { open : 1, high : 2, low : 3, close : 4 },
			news : [{ url : 'url', title : 'title' }],
			time : 'time per minute'
		}

		- Si (la donnée n'existe pas dans l'historique) alors attaquer le DAO pour le trouver
*/

//Import mongoose schema
const Company = require('./models/Company');
const News = require('./models/News');
const QuotePerMinute = require('./models/QuotePerMinute');

/***************** Static data ************/
	function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}

	/*const staticSymbols = 
	[
	  {
	    about: ' Apple est une entreprise multinationale américaine qui conçoit et commercialise des produits électroniques grand public, des ordinateurs personnels et des logiciels informatiques. Parmi les produits les plus connus de l\'entreprise se trouvent les ordinateurs Macintosh, l\'iPod, l\'iPhone et l\'iPad, la montre Apple Watch, le lecteur multimédia iTunes, la suite bureautique iWork, la suite multimédia iLife ou des logiciels à destination des professionnels tels que Final Cut Pro et Logic Pro. En 2017, l\'entreprise emploie 116 000 employés et exploite 499 Apple Stores répartis dans 22 pays5,6 et une boutique en ligne où sont vendus les appareils et logiciels d\'Apple mais aussi de tiers. Son bénéfice annuel pour l\'année 2017 est de 45,2 milliards de dollars. En 2014, Apple réalise 18 milliards de dollars de profits pour le dernier trimestre, battant le précédent record pour une entreprise cotée, établi en 2012 par ExxonMobil avec 16 milliards de dollars de bénéfice trimestriel7. Apple est créée le 1er avril1976 dans le garage de la maison d\'enfance de Steve Jobs à Los Altos en Californie par Steve Jobs, Steve Wozniak et Ronald Wayne8, puis constituée sous forme de société le 3 janvier 1977 à l\'origine sous le nom d\'Apple Computer, mais pour ses 30 ans et pour refléter la diversification de ses produits, le mot « computer » est retiré le 9 janvier 20079. ',
	    name: 'Apple Inc',
	    symbol: 'AAPL'
	  },
	  {
	    about: 'Facebook est un réseau social en ligne qui permet à ses utilisateurs de publier des images, des photos, des vidéos, des fichiers et documents, d\'échanger des messages, joindre et créer des groupes et d\'utiliser une variété d\'applications.Troisième site web le plus visité au monde après Google et YouTube selon Alexa3, il compte, en décembre 2015, 1,04 milliard d\'utilisateurs actifs quotidiens sur un total de 1,59 milliard d\'utilisateurs actifs mensuels4. Le 24 août 2015, pour la première fois, un milliard de personnes ont utilisé Facebook dans la même journée5. En juin 2017, Facebook déclare avoir franchi le nombre de 2 milliards d\'utilisateurs actifs6. Facebook est né en 2004 à l\'université Harvard ; d\'abord réservé aux étudiants de cette université, il s\'est ensuite ouvert à d\'autres universités américaines avant de devenir accessible à tous en septembre 2006. Le nom du site provient des albums photo (« trombinoscopes » ou « facebooks » en anglais) regroupant les photos des visages de tous les élève prises en début d\'année universitaire. Facebook fait régulièrement l\'objet de débats tant sur le plan politique que juridique, économique, culturel et social. Son influence dans la sphère publique et la manière dont il affecte la vie sociale de ses utilisateurs, son usage des données personnelles, son rôle dans la propagation des fake news ou encore sa politique de régulation des contenus sont ainsi souvent discutés dans l\'actualité.',
	    name: 'Facebook Inc',
	    symbol: 'FB'
	  },
	  {
	    about: 'Intel Corporation est une entreprise américaine fondée le 18 juillet 1968 par Gordon Moore, Robert Noyce et Andrew Grove. Elle est le premier fabricant mondial de semi-conducteurs si on se base sur le chiffre d\'affaires. Elle fabrique des microprocesseurs — c\'est d\'ailleurs elle qui a créé le premier microprocesseur x86 —, des cartes mères, des mémoires flash et des processeurs graphiques notamment.',
	    name: 'Intel Corporation',
	    symbol: 'INTC'
	  },
	  {
	    about: 'Google est une entreprise américaine de services technologiques fondée en 1998 dans la Silicon Valley, en Californie, par Larry Page et Sergueï Brin, créateurs du moteur de recherche Google. C\'est une filiale de la société Alphabet depuis août 2015.L\'entreprise s\'est principalement fait connaître à travers la situation monopolistique de son moteur de recherche, concurrencé historiquement par AltaVista puis par Yahoo! et Bing. Elle a ensuite procédé à de nombreuses acquisitions et développements et détient aujourd\'hui de nombreux logiciels et sites web notables parmi lesquels YouTube, le système d\'exploitation pour téléphones mobiles Android, ainsi que d\'autres services tels que Google Earth, Google Maps ou Google Play. Google s\'est donné comme mission « d\'organiser l\'information à l\'échelle mondiale et de la rendre universellement accessible et utile ». Après Larry Page et Eric Schmidt, son DG est, depuis 2015, Pichai Sundararajan. Google est devenu l\'une des premières entreprises américaines et modiales par sa valorisation boursière, quelques années après une entrée en bourse originale. Début 2008, elle valait 176 milliards de dollars à Wall Street10. En 2014, le classement Best Global Brands d\'Interbrand positionne Google comme la 2e entreprise mondiale en termes de valeur avec une valorisation de 107,43 milliards de dollars (+15 % par rapport à 2013), dépassant avec Apple pour la première fois depuis la création de ce classement en 1974 la barre des cent milliards de dollars11. Le 1er février 2016, Google dépasse Apple et devient la première capitalisation boursière des États-Unis avec une capitalisation boursière totale de 550 milliards de dollars dispersée au travers de ses différentes catégorises d\'actions12. La société compte environ 50 000 employés. La plupart travaillent au siège mondial : le Googleplex, à Mountain View en Californie.',
	    name: 'Alphabet Inc',
	    symbol: 'GOOGL'
	  },
	  {
	    about: 'Adobe Systems ou Adobe est une entreprise informatique éditant des logiciels graphiques dont InDesign, Acrobat, Photoshop, Illustrator et Flash. La société a également édité des logiciels de montage vidéo (Adobe Premiere Pro et After Effects) et audio (Adobe Audition). Ces derniers sont maintenant des références mondiales dans le domaine de l\'édition vidéo, photo, audio et dans l\'illustration et le graphisme. Adobe vient du nom de la rivière Adobe Creek (en) (Los Altos, Californie) qui coule derrière la maison de son fondateur John Warnock.',
	    name: 'Adobe Systems Incorporated',
	    symbol: 'ADBE'
	  },
	  {
	    about: 'International Business Machines Corporation, connue sous le sigle IBM, est une société multinationale américaine présente dans les domaines du matériel informatique, du logiciel et des services informatiques.La société est née le 16 juin 1911 de la fusion de la Computing Scale Company et de la Tabulating Machine Company sous le nom de Computing Tabulating Recording Company (CTR). Celle-ci a changé de nom pour devenir International Business Machines Corporation le 14 février 1924. On lui prête le surnom de Big Blue en référence au bleu sombre, couleur longtemps associée à l’entreprise. Dans les années 1970 et les années 1980, IBM était la première capitalisation boursière au monde.',
	    name: 'International Business Machines Corporation',
	    symbol: 'IBM'
	  },
	  {
	    about: 'Cisco Systems est une entreprise informatique américaine spécialisée, à l’origine, dans le matériel réseau (routeurs et commutateurs ethernet), et depuis 2009 dans les serveurs2. Elle est dirigée par Chuck Robbins depuis juillet 2015. Son prédécesseur, John Chambers3, était en fonction depuis 1995 et est président du conseil d\'administration depuis novembre 2006.Cisco, dont le siège social se trouve à San José en Californie, tire son nom de la ville où elle a été fondée, San Francisco et son fameux Golden Gate Bridge stylisé par les barres bleues du logo de la société4. Fondé le 10 décembre 19845 par Leonard Bosack et Sandra Lerner, un couple qui travaillait au service informatique de l’université Stanford, Cisco n’a pas été la première société à créer et vendre des routeurs mais a mis au point le premier routeur permettant d’interconnecter des réseaux utilisant des protocoles de communication différents.[réf. nécessaire] Alors que Cisco compte seulement 4 employés en 1986, l\'entreprise commercialise son premier routeur. Dans ses premières années, Cisco comptera entre autres le CERN et le réseau européen EUNet comme clients5. La société entre en bourse (NASDAQ) le 16 février 1990 au prix de 10 cents l\'action : la performance décevante de l\'action à son introduction conduira à la démission de son directeur général Len Bosack, et également par effet domino, celle de Sandra Lerner5.',
	    name: 'Cisco Systems Inc',
	    symbol: 'CSCO'
	  },
	  {
	    about: 'Electronic Arts ou EA est une société américaine fondée le 28 mai 1982 et dont le siège se situe à Redwood City en Californie. EA est l\'un des principaux développeurs et producteurs mondiaux de jeux vidéo. La société occupe la place de leader sur ce marché jusqu\'en 2008, notamment grâce à des rachats de sociétés et de franchises de jeux, mais aussi en acquérant les droits de licences sportives, comme celles de la FIFA, la NBA, la NFL, ou encore celle de la LNH. Electronic Arts est, en 2013, la troisième plus grande société commercialisant des jeux vidéo, par chiffre d\'affaires, après avoir été la 4e en 2012 et 2011.',
	    name: 'Electronic Arts Inc.',
	    symbol: 'EA'
	  },
	  {
	    about: 'HP Inc. est l\'une des deux entités résultant de la scission de Hewlett-Packard le 31 octobre 2015.Le 1er novembre 2015, HP se divise en deux entités distinctes : HP Inc. et Hewlett-Packard Enterprise. En septembre 2016, HP-Inc annonce l\'acquisition des activités imprimantes de Samsung pour 1,05 milliard de dollar US. En octobre 2016 HP-Inc annonce la suppression de 3 à 4 000 postes d\'ici à 3 ans.',
	    name: 'HP Inc.',
	    symbol: 'HPQ'
	  },
	  {
	    about: 'Broadcom est une entreprise américaine de l\'industrie de l\'électronique, qui développe des semi-conducteurs utilisés dans divers équipements de télécommunications.',
	    name: 'Broadcom Limited',
	    symbol: 'AVGO'
	  },
	  {
	    about: 'Twitter est un réseau social de microblogage géré par l\'entreprise Twitter Inc. Il permet à un utilisateur d’envoyer gratuitement de brefs messages, appelés tweets, sur internet, par messagerie instantanée ou par SMS. Ces messages sont limités à 280 caractères. Twitter a été créé le 21 mars 20064 par Jack Dorsey, Evan Williams, Biz Stone et Noah Glass, et lancé en juillet de la même année. Le service est rapidement devenu populaire, jusqu\'à réunir plus de 500 millions d\'utilisateurs dans le monde fin février 20126. Au 5 mars 2017, Twitter compte 313 millions d’utilisateurs actifs par mois avec 500 millions de tweets envoyés par jour et est disponible en plus de 40 langues. En 2018, Twitter annonce pour la première fois avoir fait du profit, notamment à la suite de restrictions budgétaires. Le siège social de Twitter Inc. se situe aux États-Unis à San Francisco. L\'entreprise dispose de plus de 35 bureaux supplémentaires à travers le monde et de serveurs informatiques à New York.',
	    name: 'Twitter, Inc',
	    symbol: 'TWTR'
	  },
	  {
	    about: 'Red Hat est une société multinationale d\'origine américaine éditant des distributions GNU/Linux. Elle est l\'une des entreprises dédiées aux logiciels Open Source les plus importantes et les plus reconnues. Elle constitue également le premier distributeur du système d\'exploitation GNU/Linux. Red Hat a été fondée en 1993 et son siège social se trouve à Raleigh en Caroline du Nord. Elle possède en plus de ce dernier un nombre important de bureaux dans le monde entier. L\'entreprise est principalement connue pour son produit Red Hat Enterprise Linux, un système d\'exploitation destiné aux entreprises. Red Hat fournit des plateformes logicielles (système d\'exploitation, intergiciel comme JBoss).',
	    name: 'Red Hat Inc',
	    symbol: 'RHT'
	  },
	  {
	    about: 'Autodesk société d\'édition de logiciels de création et de contenu numérique, a été fondée par John Walker avec douze autres personnes en 1982. Au cours de son histoire, elle a été située à plusieurs endroits dans le comté de Marin en Californie. Aujourd\'hui, son siège social se trouve à San Rafael, Californie.',
	    name: 'Autodesk, Inc.',
	    symbol: 'ADSK'
	  },
	  {
	    about: 'NetApp, Inc est une société multinationale américaine de stockage et de gestion de données dont le siège est à Sunnyvale, en Californie . Il est classé dans le Fortune 500 depuis 2012. Fondé en 1992 avec une introduction en bourse en 1995, NetApp propose des logiciels, systèmes et services pour gérer et stocker des données, y compris son système d\'exploitation Data ONTAP propriétaire.',
	    name: 'NetApp, Inc',
	    symbol: 'NTAP'
	  },
	  {
	    about: 'Motorola Solutions est une entreprise américaine des télécommunications et de capture automatique de données. Elle a été créée en janvier 2011 à la suite de la scission de Motorola. Elle fournit aujourd\'hui à des organismes de sécurité publique et à des entreprises commerciales des outils et services de communication tout-terrain (comme des émetteurs-récepteurs radio mobiles utilisés par la police ou sur les chantiers, etc.)',
	    name: 'Motorola Solutions, Inc.',
	    symbol: 'MSI'
	  },
	  {
	    about: 'Cerner Corporation est un fournisseur américain de solutions, de services, d\'appareils et de matériel de technologie de l\'information médicale (TIH). En février 2018, ses produits étaient utilisés dans plus de 27 000 installations dans le monde et l\'entreprise comptait environ 26 000 employés dans le monde.Cerner a été fondée en 1979 par Neal Patterson , Paul Gorup et Cliff Illig, qui étaient des collègues d\' Arthur Andersen . Son nom d\'origine était PGI & Associates mais a été renommé Cerner en 1984 quand il a déployé son premier système, PathNet. Il a été public en 1986. La base de clientèle de Cerner a augmenté régulièrement à la fin des années 1980, atteignant 70 emplacements en 1987, 120 emplacements en 1988, 170 emplacements en 1989 et 250 sites en 1990. Les installations étaient principalement de PathNet systèmes. ',
	    name: 'Cerner Corporation',
	    symbol: 'CERN'
	  },
	  {
	    about: 'Le NASDAQ (sigle de National Association of Securities Dealers Automated Quotations) est une bourse de valeurs ouverte en 1971, actuellement[Quand ?] le deuxième plus important marché d\'actions des États-Unis, en volume traité, derrière le New York Stock Exchange. Il est le plus grand marché électronique d\'actions du monde. Depuis début 2008, la bourse appartient au groupe européano-américain Nasdaq.L’indice NASDAQ, aussi appelé « le NASDAQ », est l\'indice boursier qui mesure la performance des entreprises qui y sont inscrites et cotées.',
	    name: 'Nasdaq, Inc.',
	    symbol: 'IXIC'
	  },
	  {
	    about: 'PG Photonics est un fabricant de lasers à fibre et d\' amplificateurs à fibre . IPG a son siège à Oxford, Massachusetts , et opère internationalement. IPG Photonics a développé et commercialisé des lasers à fibre optique , qui sont utilisés dans une variété d\'applications, y compris le traitement des matériaux , les applications médicales et les télécommunications .IPG dispose d\'installations de fabrication aux États-Unis, en Allemagne, en Russie et en Italie.',
	    name: 'IPG Photonics Corporation',
	    symbol: 'IPGP'
	  },
	  {
	    about: 'Microsoft Corporation est une multinationale informatique et micro-informatique américaine, fondée en 1975 par Bill Gates et Paul Allen. Son activité principale consiste à développer et vendre des systèmes d’exploitation, des logiciels et des produits matériels dérivés. En 2013, le chiffre d\'affaires s’élevait à 77,85 milliards de dollars8. L\'entreprise emploie 120 000 personnes dans 107 pays.Le siège social se situe à Redmond, près de Seattle (État de Washington) à l\'ouest des États-Unis. Les meilleures ventes historiques sont portées par le système d’exploitation Windows et la suite bureautique Office qui alimentent à présent une politique de diversification. Microsoft est, cependant, présent dans d\'autres secteurs activités : comme le moteur de recherche Bing, les périphériques (claviers, souris) et les consoles de jeu vidéo Xbox',
	    name: 'Microsoft Corporation',
	    symbol: 'MSFT'
	  },
	  {
	    about: 'Dell, Inc était une entreprise américaine, actuellement remplacé par Dell Technologies et actuellement troisième plus grand constructeur d\'ordinateurs au monde derrière Lenovo et Hewlett-Packard. Son siège est basé à Round Rock dans l\'État du Texas. Même si Dell Computer est surtout connu pour les PC qu\'il conçoit, fabrique et vend aux particuliers et aux professionnels, il est également présent sur les marchés de serveurs d\'entreprise, de systèmes de sauvegarde et stockage de données et du matériel spécifique aux réseaux informatiques. Dell propose également des logiciels et des périphériques comme des imprimantes, appareils photos numériques, et beaucoup d\'autres encore. Dell était coté au Nasdaq à New York sous le symbole DELL jusqu\'en 2013.',
	    name: 'Dell Technologies Inc',
	    symbol: 'DVMT'
	  },
	  {
	    about: 'NVIDIA Corporation est un fournisseur mondial de processeurs graphiques, de cartes graphiques et de puces graphiques pour PC et consoles de jeux (Xbox, PlayStation 3,Nintendo Switch). Son siège est à Santa Clara en Californie aux États-Unis. NVIDIA conçoit principalement des circuits graphiques allant du modèle pour netbook (Ion) aux puissants modèles destinés aux joueurs (GeForce), et même au monde professionnel (Quadro et autres). NVIDIA a récemment rejoint l’industrie du jeu vidéo mobile avec la sortie des consoles portables NVIDIA Shield. Ses principaux concurrents sont AMD (anciennement ATI)B 1, Intel Corporation et Qualcomm. NVIDIA a été fondée à Santa Clara en Avril 1993 par : -Jen-Hsun Huang, ancien employé de LSI Logic et d\'AMD (en tant que designer de microprocesseurs), actuellement PDG ; -Chris Malachowsky, ancien employé de Hewlett-Packard et de Sun Microsystems, actuellement Vice-Président ; -Curtis Priem, ancien employé de Sun Microsystems, actuellement directeur technique. Ils baptisent la société NVIDIA, et la dotent d\'un logo vert et blanc représentant un œil stylisé. NVIDIA conserve son statut de startup jusque vers les années 1997-1998, lorsqu\'elle prend de l\'importance pour devenir peu à peu un acteur majeur sur le marché des processeurs graphiques, notamment avec le lancement des puces graphiques Riva pour PC.',
	    name: 'NVIDIA Corporation',
	    symbol: 'NVDA'
	  },
	  {
	    about: 'Oracle (Oracle Corporation) est une entreprise américaine créée en 1977 par Larry Ellison. Ses produits phares sont Oracle Database (un système de gestion de base de données), Oracle Weblogic Server (un serveur d\'applications) et Oracle E-Business Suite (un progiciel de gestion intégré)',
	    name: 'Oracle Corporation',
	    symbol: 'ORCL'
	  },
	  {
	    about: 'VMware est une société informatique américaine fondée en 1998, filiale d\'EMC Corporation depuis 2004 (racheté par Dell le 7 septembre 2016), qui propose plusieurs produits propriétaires liés à la virtualisation d\'architectures x86. C\'est aussi par extension le nom d\'une gamme de logiciels de virtualisation',
	    name: 'Vmware, Inc.',
	    symbol: 'VMW'
	  },
	  {
	    about: 'Texas Instruments (TI) est une entreprise d\'électronique, fondée en 1941, basée à Dallas, renommée dans le domaine des composants électroniques passifs et des semi-conducteurs.Texas Instruments a notamment inventé le circuit intégré, ouvrant ainsi la voie au développement de l\'informatique tel qu\'on le connaît actuellement. Cette invention valut, en 2000, le prix Nobel de physique à Jack Kilby. TI est très présente dans le domaine des DSP. Elle fabrique aussi de nombreux chipset pour appareils embarqués. Par exemple la série des processeurs OMAP. Texas Instruments est également présente dans l\'industrie cinématographique. TI a toujours été parmi les 10 plus importants fabricants de puces électroniques. En 2011, TI est numéro 3, derrière Intel et Samsung, mais devant Toshiba et STMicroelectronics. Texas Instruments développe également des applications dans les domaines de l\'espace, de l\'avionique et de la défense',
	    name: 'Texas Instruments Incorporated',
	    symbol: 'TXN'
	  },
	  {
	    about: 'Western Digital Corporation, également désignée par son sigle WD ou WDC, est une société américaine de fabrication de matériel informatique. Elle a été fondée en 1970 et a commencé à concevoir et fabriquer des disques durs en 1988. C\'est à l\'heure actuelle le premier fabricant de disques durs, devant Seagate. Western digital est réputé pour avoir sorti le seul disque dur SATA grand public tournant à 10 000 tr/min : Le WD Raptor, suivi par le VelociRaptor.',
	    name: 'Western Digital Corporation',
	    symbol: 'WDC'
	  },
	  {
	    about: 'Skyworks Solutions est une entreprise américaine basée à Woburn, au Massachusetts, spécialisée dans la fabrication de semi-conducteurs pour mobile. Elle est issue de la fusion entre Conexant et la division sans-fil de Conexant en 2002. En octobre 2015, Skyworks Solutions lance une offre d\'acquisition sur PMC-Sierra, une entreprise de semi-conducteurs, pour 2 milliards de dollars, avant d\'être concurrencée par plusieurs offres supérieures de la part de Microsemi dont une de 2,33 milliards de dollars. En novembre 2015, Skyworks Solutions abandonne son offre d\'acquisition',
	    name: 'Skyworks Solutions, Inc',
	    symbol: 'SWKS'
	  },
	  {
	    about: 'Nokia Corporation est une entreprise multinationale de télécommunications finlandaise. Devenu le premier constructeur mondial de téléphones mobiles en 1998, il le reste jusqu\'en 2011 avant de perdre l\'année suivante son titre de numéro un mondial au profit de Samsung. Le 3 septembre 2013, Nokia se sépare de sa division « terminaux mobiles », en déclin, pour recentrer son activité sur sa division « réseaux » Nokia Solutions and Networks. En octobre 2014, la disparition de la marque de téléphones est amorcée par Microsoft. Ne pas confondre Nokia Corporation avec la marque de téléphones portables Nokia, dont les droits d\'utilisation appartiennent depuis 2016 à la société finlandaise HMD Global.',
	    name: 'Nokia Corporation',
	    symbol: 'NOK'
	  },
	  {
	    about: 'Ansys, Inc. is a public company based in Canonsburg, Pennsylvania. It develops and markets engineering simulation software. Ansys software is used to design products and semiconductors, as well as to create simulations that test a product\'s durability, temperature distribution, fluid movements, and electromagnetic properties. Ansys was founded in 1970 by John Swanson. Swanson sold his interest in the company to venture capitalists in 1993. Ansys went public on NASDAQ in 1996. In the 2000s, Ansys made numerous acquisitions of other engineering design companies, acquiring additional technology for fluid dynamics, electronics design, and other physics analysis.',
	    name: 'ANSYS, Inc',
	    symbol: 'ANSS'
	  },
	  {
	    about: 'Snapchat est une application gratuite de partage de photos et de vidéos disponible sur plateformes mobiles iOS et Android de la société Snap Inc. . Elle a été conçue et développée par des étudiants de l\'université Stanford en Californie. L\'âge requis pour télécharger et utiliser cette application est fixé à 13 ans. La particularité de cette application est l\'existence d\'une limite de temps de visualisation du média envoyé à ses destinataires. Chaque photographie ou vidéo envoyée ne peut être visible par son destinataire que durant une période de temps allant d\'une à dix secondes, mais aussi, depuis récemment, sans limite de durée. L\'entreprise est valorisée à 24 milliards de dollars en 20172.En 2016, l\'entreprise change de nom pour Snap Inc.',
	    name: 'Snap Inc',
	    symbol: 'SNAP'
	  },
	  {
	    about: 'Omnicom Group, Inc est une société américaine de marketing et de communication d\' entreprise basée à New York . Les réseaux de marque et les sociétés spécialisées d\'Omnicom fournissent des services dans quatre disciplines: la publicité , la gestion de la relation client (CRM), les relations publiques et les services spécialisés . Les services inclus dans ces disciplines sont la planification et l\'achat de médias , le marketing numérique et interactif, le marketing sportif et événementiel, le marketing sur le terrain et le conseil en marques . Omnicom Group a été classé comme l\'une des quatre plus grandes agences de publicité dans le monde par le New York Times en 2002. En 2014, Omnicom a été considérée comme la deuxième plus grande holding de publicité par le Wall Street Journal . L\'entreprise emploie plus de 74 000 employés dans environ 100 pays à travers le monde.',
	    name: 'Omnicom Group Inc',
	    symbol: 'OMC'
	  }
	];*/

	const staticNews =  [
		{
		link : 'https://www.forbes.com/sites/joannmuller/2018/02/16/tesla-thinks-it-will-school-toyota-on-lean-manufacturing-fixing-model-3-launch-would-be-a-start',
		titre : 'Musk Thinks Tesla Will School Toyota On Lean Manufacturing; Fixing Model 3 Launch Would Be A Start'
		},
		{
			link : 'https://finance.yahoo.com/m/3a76b982-ef21-354b-9086-2c1483a903ce/don%27t-be-dumb%3A-stock-prices.html',
			titre : "Don't Be Dumb: Stock Prices Will Probably Be Higher in 10 Years",
		},
		{
			link : 'https://finance.yahoo.com/m/90efb74a-7007-3979-ab9f-1a4d19422ae8/record-numbers-switch-energy.html',
			titre : 'Record numbers switching electricity supplier',
		},
		{
			link : 'https://finance.yahoo.com/news/read-job-application-steve-jobs-133000641.html',
			titre : 'Read a job application from Steve Jobs from 3 years before he cofounded Apple (AAPL)',
		},
		{
			link : 'https://finance.yahoo.com/m/df2eb013-8119-32e9-9514-8bb49f3bf00d/taxes-aren%27t-the-real-problem.html',
			titre : "Taxes Aren't the Real Problem With Congo Mining",
		},
		{
			link : "Debt-financing is always a 'double-edged sword' for econo...",
			titre : 'https://finance.yahoo.com/video/debt-financing-always-double-edged-010200518.html',
		},
		{
			link : 'Eicher Motors shuts joint venture with U.S. partner Polaris',
			titre : 'https://finance.yahoo.com/news/eicher-motors-shuts-jv-u-partner-polaris-052640830--finance.html',
		},
	];

	const staticStates = {
		AAPL : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		GOOGL : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : 2.12 },
		MSFT : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : 3.14 },
		FB : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : -0.59 },
		INTC : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : 2.59 },
		ORCL : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : 1.6 },
		CSCO : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : 5.23 },
		NVDA : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : 2.60 },
		IBM : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		ADBE : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		TXN : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		AVGO : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		VMW : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		HPQ : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		EA : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		NOK : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		ADSK : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		WDC : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		RHT : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		TWTR : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		SNAP : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		CERN : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		SWKS : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		MSI : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		NTAP : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		OMC : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		DVMT : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		ANSS : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		IPGP : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
		IXIC : { volume : getRandomInt(1000000, 3100000), price : getRandomInt(100, 200), difference : parseFloat(getRandomArbitrary(-2, 3).toFixed(2)) },
	};
	
	const data = [
		{
			quote : {
				open : 100,
				high : 123,
				low : 90,
				close : 110,
			},
			news : [],
			time : "2018-03-11 09:59:00"
		},
		{
			quote : {
				open : 111,
				high : 134,
				low : 101,
				close : 120,
			},
			news : [],
			time : "2018-03-11 10:00:00"
		},
		{
			quote : {
				open : 40,
				high : 60,
				low : 33,
				close : 50,
			},
			news : [],
			time : "2018-03-11 10:01:00"
		}
	];
/*****************************************/

const MAX_QUOTES_HISTORY_PER_SYMBOL = 300;
const MAX_NEWS_HISTORY = 5;

/* QuoteHistory = { 
			AAPL : [{
				quote : { open : 1, high : 2, low : 3, close : 4 },
				news : [{ link : 'url', titre : 'title', description : "desc" }]
				time : 'time per minute'
			}]
} */
let QuoteHistory = null;

/* StatesHistory = { AAPL : { volume : 0, price : 0, difference : 0 } } */
let StatesHistory = null;

/* Symbols = [ { name: "Apple Inc", symbol: "AAPL" } ] */
let Symbols = null;

/* NewsHistory = [{ symbol : 'AAPL', time : 'Date', link : 'link', titre : 'title' }] */
let NewsHistory = [];

class ServerHistoryKeeper 
{
	static Init()
	{
		Company.findAll( (err, companies) => {
			Symbols = companies;
			QuoteHistory = {};
			Symbols.forEach((element) => {
				QuoteHistory[element.symbol] = [];
				QuotePerMinute.findLatest(element.symbol, MAX_QUOTES_HISTORY_PER_SYMBOL, (result) => {
			        console.log(JSON.stringify(result));
			        console.log("Init :");
			        QuoteHistory[element.symbol] = result[element.symbol];
			    });
			});

			StatesHistory = {};
			Symbols.forEach((element) => {
				StatesHistory[element.symbol] = { volume : 0, price : 0, difference : 0 };
			});
		});

		News.findLatest( (err, news) => {
			if (!err)
				NewsHistory = news;
		});
	}

	//Input form : QuoteHistory form
	static newDataFromConsumer(symbol, data)
	{
		//Adding the quote
		if (data.quote.open)
		{
			let quote = data.quote;
			if (QuoteHistory[symbol].length == MAX_QUOTES_HISTORY_PER_SYMBOL)
				QuoteHistory[symbol] = QuoteHistory[symbol].slice(1);
			let obj = {
				quote : quote,
				news : data.news,
				time : data.time
			};
			
			QuoteHistory[symbol].push(obj);

			/*console.log(`QuoteHistory[${symbol}] = `);
			console.log(QuoteHistory[symbol]);*/
			//Calculating the state
			const last = StatesHistory[symbol];
			/*console.log('Last : ');
			console.log(last);
			console.log('quote : ');
			console.log(quote);*/

			let difference = 100;
			if (last.price != 0)
				difference = ((quote.close - last.price) / last.price) * 100;
			difference = parseFloat(difference.toFixed(2));

			StatesHistory[symbol] = {volume : quote.volume, price : quote.close, difference : difference};
		}
		
		//Adding the news
		if (data.news.length > 0){
			let toRemove = data.news.length + NewsHistory.length - MAX_NEWS_HISTORY;
			if (toRemove > 0)
				NewsHistory = NewsHistory.slice(toRemove);

			data.news.forEach((newsItem) => {
				newsItem.time = data.time;
				newsItem.symbol = symbol;
			});

			NewsHistory = NewsHistory.concat(data.news);
		}
	}

	static fetchNews(){
		return NewsHistory;
	}

	static fetchStates(){
		return StatesHistory;
	}

	static fetchQuotes(symbol){
		return QuoteHistory[symbol];
		//return data;
	}

	static fetchSymbols()
	{
		return Symbols;
	}
}

module.exports = ServerHistoryKeeper;