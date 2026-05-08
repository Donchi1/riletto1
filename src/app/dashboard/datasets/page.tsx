'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Database, Search, Filter, Download, ShieldCheck, Star, TrendingUp,
  Building2, Users, Heart, Home, Utensils, Dumbbell, Calculator, Stethoscope
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const categoryIcons: Record<string, React.ElementType> = {
  'E-Commerce': Building2,
  'Agencies': Users,
  'Technology': TrendingUp,
  'Food & Beverage': Utensils,
  'Healthcare': Stethoscope,
  'Real Estate': Home,
  'Finance': Calculator,
  'Health & Wellness': Dumbbell,
}

const categoryColors: Record<string, string> = {
  'E-Commerce': 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
  'Agencies': 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
  'Technology': 'text-primary bg-primary/10',
  'Food & Beverage': 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30',
  'Healthcare': 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30',
  'Real Estate': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
  'Finance': 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30',
  'Health & Wellness': 'text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-950/30',
}

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchDatasets = async () => {
      const { data, error } = await supabase.from('datasets').select('*').eq('is_active', true).order('is_featured', { ascending: false })
      if (data) setDatasets(data)
      setLoading(false)
    }
    fetchDatasets()
  }, [])

  const categories = Array.from(new Set(datasets.map((d) => d.category)))

  const filtered = datasets.filter((d) => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !selectedCategory || d.category === selectedCategory
    return matchSearch && matchCategory
  })

  const featured = filtered.filter((d) => d.is_featured)
  const rest = filtered.filter((d) => !d.is_featured)

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Datasets" subtitle="Curated, verified lead collections across industries" />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search datasets..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={!selectedCategory ? 'default' : 'outline'}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                className="h-8 text-xs"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 space-y-3 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-8 bg-muted rounded" />
              </Card>
            ))}
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-amber-500" />
                  <h2 className="text-sm font-semibold text-foreground">Featured Datasets</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {featured.map((dataset, i) => (
                    <DatasetCard key={dataset.id} dataset={dataset} index={i} />
                  ))}
                </div>
              </div>
            )}

            {rest.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-4">All Datasets</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((dataset, i) => (
                    <DatasetCard key={dataset.id} dataset={dataset} index={i} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function DatasetCard({ dataset, index }: { dataset: any; index: number }) {
  const Icon = categoryIcons[dataset.category] || Database
  const colorClass = categoryColors[dataset.category] || 'text-primary bg-primary/10'
  const freshnessDays = dataset.freshness_date
    ? Math.floor((Date.now() - new Date(dataset.freshness_date).getTime()) / (1000 * 60 * 60 * 24))
    : 30

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <Card className="p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-200 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2">
            {dataset.is_featured && (
              <Badge className="text-[10px] px-1.5 py-0 h-4 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">{dataset.category}</Badge>
          </div>
        </div>

        <h3 className="font-semibold text-foreground mb-2">{dataset.title}</h3>
        <p className="text-xs text-muted-foreground mb-4 flex-1">{dataset.description}</p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="text-base font-bold text-foreground">{dataset.lead_count?.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Leads</p>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">{dataset.verification_rate}%</p>
            <p className="text-[10px] text-muted-foreground">Verified</p>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-foreground">{freshnessDays}d</p>
            <p className="text-[10px] text-muted-foreground">Fresh</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {(dataset.tags || []).slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 h-4">{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-lg font-bold text-foreground">${dataset.price}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => toast.info('Showing sample data...')}>
              Preview
            </Button>
            <Button size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success(`${dataset.title} added to cart`)}>
              <Download className="h-3 w-3" />Get Dataset
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
