"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Upload, Star, Tag, ChevronDown, X, Plus } from "lucide-react"
import { ColumnType } from "./ColumnManager"

interface DynamicFieldProps {
  column: {
    id: string
    name: string
    type: ColumnType
    settings: Record<string, any>
  }
  value: any
  onChange: (value: any) => void
  readonly?: boolean
}

export function DynamicField({ column, value, onChange, readonly = false }: DynamicFieldProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const renderField = () => {
    switch (column.type.type) {
      // Basic Types
      case "text":
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={column.settings.placeholder || "Enter text..."}
            maxLength={column.settings.maxLength}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            readOnly={readonly}
          />
        )

      case "number":
        return (
          <input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            min={column.settings.min}
            max={column.settings.max}
            step={column.settings.decimals ? 0.01 : 1}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            readOnly={readonly}
          />
        )

      case "email":
        return (
          <input
            type="email"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            readOnly={readonly}
          />
        )

      case "phone":
        return (
          <input
            type="tel"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            readOnly={readonly}
          />
        )

      case "url":
        return (
          <input
            type="url"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            readOnly={readonly}
          />
        )

      case "password":
        return (
          <input
            type="password"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter password..."
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            readOnly={readonly}
          />
        )

      case "textarea":
        return (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={column.settings.placeholder || "Enter text..."}
            maxLength={column.settings.maxLength}
            rows={column.settings.rows || 3}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 resize-none"
            readOnly={readonly}
          />
        )

      case "richtext":
        return (
          <div className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
            <div
              contentEditable={!readonly}
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: value || "" }}
              onBlur={(e) => onChange(e.currentTarget.innerHTML)}
              className="min-h-[60px] focus:outline-none"
            />
          </div>
        )

      // Selection Types
      case "dropdown":
        return (
          <div className="relative">
            <button
              onClick={() => !readonly && setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-left flex items-center justify-between"
            >
              <span>{value || "Select option..."}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && !readonly && (
              <div className="absolute z-10 w-full mt-1 bg-purple-900 border border-white/20 rounded-lg shadow-lg">
                {column.settings.options?.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => {
                      onChange(option)
                      setIsDropdownOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "multiselect":
        return (
          <div className="flex flex-wrap gap-2">
            {value?.map((selected: string) => (
              <span
                key={selected}
                className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-200 text-sm flex items-center gap-1"
              >
                {selected}
                {!readonly && (
                  <button
                    onClick={() => onChange(value.filter((v: string) => v !== selected))}
                    className="text-purple-400 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
            {!readonly && (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-purple-300 hover:text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </button>
            )}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-purple-900 border border-white/20 rounded-lg shadow-lg">
                {column.settings.options?.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => {
                      const currentValues = value || []
                      if (!currentValues.includes(option)) {
                        onChange([...currentValues, option])
                      }
                      setIsDropdownOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "checkbox":
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 bg-white/10 border border-white/20 rounded text-purple-500 focus:ring-purple-500"
              disabled={readonly}
            />
            <span className="text-white">{column.settings.label || "Check this option"}</span>
          </label>
        )

      case "radio":
        return (
          <div className="space-y-2">
            {column.settings.options?.map((option: string) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={column.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-4 h-4 bg-white/10 border border-white/20 text-purple-500 focus:ring-purple-500"
                  disabled={readonly}
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        )

      case "toggle":
        return (
          <button
            onClick={() => !readonly && onChange(!value)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              value ? "bg-purple-500" : "bg-gray-600"
            }`}
            disabled={readonly}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                value ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        )

      // Date & Time
      case "date":
        return (
          <div className="relative">
            <input
              type="date"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              readOnly={readonly}
            />
            <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-purple-400 pointer-events-none" />
          </div>
        )

      case "time":
        return (
          <div className="relative">
            <input
              type="time"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              readOnly={readonly}
            />
            <Clock className="absolute right-3 top-2.5 w-4 h-4 text-purple-400 pointer-events-none" />
          </div>
        )

      case "datetime":
        return (
          <div className="relative">
            <input
              type="datetime-local"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              readOnly={readonly}
            />
          </div>
        )

      // Media & Files
      case "file":
        return (
          <div className="relative">
            <input
              type="file"
              accept={column.settings.allowedTypes?.join(",") || "*"}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  onChange({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file)
                  })
                }
              }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
              disabled={readonly}
            />
            {value && (
              <div className="mt-2 text-purple-300 text-sm">
                {value.name} ({(value.size / 1024).toFixed(1)} KB)
              </div>
            )}
          </div>
        )

      case "image":
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  onChange({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file)
                  })
                }
              }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
              disabled={readonly}
            />
            {value?.url && (
              <img
                src={value.url}
                alt={value.name}
                className="mt-2 max-w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
        )

      // Advanced Types
      case "currency":
        return (
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-purple-400">
              {column.settings.currency || "$"}
            </span>
            <input
              type="number"
              value={value || ""}
              onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
              min={column.settings.min}
              max={column.settings.max}
              step="0.01"
              className="w-full pl-8 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              readOnly={readonly}
            />
          </div>
        )

      case "percentage":
        return (
          <div className="relative">
            <input
              type="number"
              value={value || ""}
              onChange={(e) => onChange(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
              min="0"
              max="100"
              step="1"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
              readOnly={readonly}
            />
            <span className="absolute right-3 top-2.5 text-purple-400">%</span>
          </div>
        )

      case "rating":
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => !readonly && onChange(star)}
                className="text-2xl transition-colors"
                disabled={readonly}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (value || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              </button>
            ))}
          </div>
        )

      case "progress":
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={value || 0}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="flex-1"
                disabled={readonly}
              />
              <span className="text-purple-300 text-sm w-12">{value || 0}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                style={{ width: `${value || 0}%` }}
              />
            </div>
          </div>
        )

      case "tags":
        return (
          <div className="flex flex-wrap gap-2">
            {value?.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-200 text-sm flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
                {!readonly && (
                  <button
                    onClick={() => onChange(value.filter((t: string, i: number) => i !== index))}
                    className="text-purple-400 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
            {!readonly && (
              <button
                onClick={() => {
                  const newTag = prompt("Enter tag name:")
                  if (newTag) {
                    onChange([...(value || []), newTag])
                  }
                }}
                className="px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-purple-300 hover:text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Tag
              </button>
            )}
          </div>
        )

      case "color":
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-8 bg-white/10 border border-white/20 rounded cursor-pointer"
              disabled={readonly}
            />
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
              readOnly={readonly}
            />
          </div>
        )

      // Automation Types
      case "status":
        return (
          <div className="flex flex-wrap gap-2">
            {column.settings.options?.map((option: string) => (
              <button
                key={option}
                onClick={() => !readonly && onChange(option)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  value === option
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-purple-300 hover:bg-white/20"
                }`}
                disabled={readonly}
              >
                {option}
              </button>
            ))}
          </div>
        )

      case "priority":
        return (
          <div className="flex space-x-2">
            {["Low", "Medium", "High", "Critical"].map((priority) => (
              <button
                key={priority}
                onClick={() => !readonly && onChange(priority)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  value === priority
                    ? priority === "Critical"
                      ? "bg-red-500 text-white"
                      : priority === "High"
                      ? "bg-orange-500 text-white"
                      : priority === "Medium"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                    : "bg-white/10 text-purple-300 hover:bg-white/20"
                }`}
                disabled={readonly}
              >
                {priority}
              </button>
            ))}
          </div>
        )

      default:
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            readOnly={readonly}
          />
        )
    }
  }

  return (
    <div className="w-full">
      {renderField()}
    </div>
  )
}
